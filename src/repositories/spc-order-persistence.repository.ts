import { MongoClient } from "mongodb";

export type Spc325OrderSnapshot = {
  orderId: string;
  document: string;
  typeDocument: "CPF" | "CNPJ";
  insumos: string[];
  xml: string;
  json: unknown;
  result: unknown | null;
  error?: string;
};

let mongoClient: MongoClient | null = null;

const maskMongoUri = (uri: string | null | undefined) => {
  if (!uri) {
    return "none";
  }

  return uri.replace(/(:\/\/)([^:@/]+)(:[^@/]*)(@)/, "$1***$3$4");
};

export const describeMongoFailure = (error: unknown, context: string) => {
  const mongoError = error as any;
  const name = String(mongoError?.name ?? "UnknownError");
  const code = String(mongoError?.code ?? "N/A");
  const message = String(mongoError?.message ?? error ?? "Unknown Mongo error");
  const uri = getMongoUri();
  const dbName = process.env.MONGODB_NAME ?? "credits";
  const collectionName = process.env.MONGODB_COLLECTION ?? "spc_report_orders";
  const tlsEnabled = /mongodb\+srv:|tls=true|ssl=true|mongodb\.net/i.test(String(uri ?? "")) || process.env.MONGODB_TLS === "true";

  return `${context}. uri=${maskMongoUri(uri)}; db=${dbName}; collection=${collectionName}; tls=${tlsEnabled}; name=${name}; code=${code}; message=${message}`;
};

const getMongoUri = () => {
  const mongoUri = process.env.MONGODB_URI ?? process.env.MONGO_URI ?? null;

  return mongoUri;
};

const getMongoClientOptions = (uri: string) => {
  const useTls = /mongodb\+srv:|tls=true|ssl=true|mongodb\.net/i.test(uri) || process.env.MONGODB_TLS === "true";
  const allowInvalidCertificates = process.env.MONGODB_TLS_ALLOW_INVALID_CERTS === "true";

  return {
    ...(useTls ? { tls: true } : {}),
    ...(allowInvalidCertificates ? { tlsAllowInvalidCertificates: true } : {}),
    authSource: process.env.MONGODB_AUTH_SOURCE ?? "admin",
    retryWrites: true,
    serverSelectionTimeoutMS: 20000,
    maxPoolSize: 5,
  };
};

const isMongoClientReady = (client: MongoClient | null | undefined) => {
  if (!client) {
    return false;
  }

  const topology = (client as any)?.topology;

  if (!topology) {
    return true;
  }

  if (typeof topology.isDestroyed === "function" && topology.isDestroyed()) {
    return false;
  }

  if (typeof topology.isConnected === "function") {
    return topology.isConnected();
  }

  return true;
};

const ensureMongoClient = async (uri: string) => {
  if (!mongoClient || !isMongoClientReady(mongoClient)) {
    mongoClient = new MongoClient(uri, getMongoClientOptions(uri));
    await mongoClient.connect();
  }

  return mongoClient;
};

const isMongoConnectionError = (error: unknown) => {
  const name = String((error as any)?.name ?? "");
  const code = String((error as any)?.code ?? "");

  return [
    "MongoServerSelectionError",
    "MongoTopologyClosedError",
    "MongoNotConnectedError",
    "MongoNetworkError",
  ].includes(name) || /SSL|ECONNRESET|ENOTFOUND|EAI_AGAIN|TIMEOUT|selection/i.test(code + " " + String(error));
};

const getMongoCollection = async () => {
  const uri = getMongoUri();

  if (!uri) {
    console.warn("Mongo SPC persistence unavailable because no URI was configured; continuing without snapshot storage. context=MONGODB_URI/MONGO_URI missing; db=credits; collection=spc_report_orders");
    return null;
  }

  try {
    const client = await ensureMongoClient(uri);

    const dbName = process.env.MONGODB_NAME ?? "credits";
    const collectionName = process.env.MONGODB_COLLECTION ?? "spc_report_orders";

    return client.db(dbName).collection(collectionName);
  } catch (error) {
    if (isMongoConnectionError(error)) {
      console.warn(describeMongoFailure(error, "Mongo SPC persistence unavailable; continuing without snapshot storage."));
      return null;
    }

    console.error(describeMongoFailure(error, "Mongo SPC persistence failed with a non-network error."));
    throw error;
  }
};

export const buildSpcOrderSnapshotFallbackPayload = (
  payload: Spc325OrderSnapshot,
) => ({
  ...payload,
  result:
    payload.result ??
    {
      error: payload.error ?? "SPC_RESULT_MAPPING_FAILED",
    },
});

export const saveSpcOrderSnapshotFallback = async (
  payload: Spc325OrderSnapshot,
) => {
  return saveSpcOrderSnapshot(buildSpcOrderSnapshotFallbackPayload(payload));
};

export const saveSpcOrderSnapshot = async (
  payload: Spc325OrderSnapshot,
) => {
  const collection = await getMongoCollection();
  const now = new Date();

  if (!collection) {
    return {
      id: payload.orderId,
      savedAt: now,
      skipped: true,
    };
  }

  const { orderId, ...snapshotData } = payload;

  try {
    await collection.updateOne(
      { _id: orderId as any },
      {
        $set: {
          ...snapshotData,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true },
    );

    return {
      id: orderId,
      savedAt: now,
      skipped: false,
    };
  } catch (error) {
    if (isMongoConnectionError(error)) {
      console.warn(describeMongoFailure(error, "SPC snapshot storage skipped because Mongo is unavailable."));
      return {
        id: orderId,
        savedAt: now,
        skipped: true,
      };
    }

    console.error(describeMongoFailure(error, "SPC snapshot storage failed with a non-network error."));
    throw error;
  }
};

export const findSpcOrderSnapshotsByOrderIds = async (orderIds: string[]) => {
  if (orderIds.length === 0) {
    return [];
  }

  const collection = await getMongoCollection();

  if (!collection) {
    return [];
  }

  try {
    const snapshots = await collection
      .find({ _id: { $in: orderIds as any[] } } as any)
      .toArray();

    return snapshots as unknown as Array<{
      _id: string;
      xml?: string;
      json?: unknown;
      result?: unknown;
    }>;
  } catch (error) {
    if (isMongoConnectionError(error)) {
      console.warn(describeMongoFailure(error, "SPC snapshot lookup skipped because Mongo is unavailable."));
      return [];
    }

    console.error(describeMongoFailure(error, "SPC snapshot lookup failed with a non-network error."));
    throw error;
  }
};
