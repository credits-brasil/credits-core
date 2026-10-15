import { MongoClient } from "mongodb";

export type Spc325OrderSnapshot = {
  orderId: string;
  document: string;
  typeDocument: "CPF" | "CNPJ";
  insumos: string[];
  xml: string;
  json: unknown;
  result: unknown;
};

let mongoClient: MongoClient | null = null;

const getMongoUri = () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error(
      "Mongo URI não configurada. Defina MONGO_URI no ambiente.",
    );
  }

  return mongoUri;
};

const getMongoClientOptions = (uri: string) => {
  const useTls = /mongodb\+srv:|tls=true|ssl=true|mongodb\.net/i.test(uri) || process.env.MONGODB_TLS === "true";
  const allowInvalidCertificates = process.env.MONGODB_TLS_ALLOW_INVALID_CERTS === "true";

  return {
    ...(useTls ? { tls: true } : {}),
    ...(allowInvalidCertificates ? { tlsAllowInvalidCertificates: true } : {}),
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

  try {
    const client = await ensureMongoClient(uri);

    const dbName = process.env.MONGODB_NAME ?? "credits";
    const collectionName = process.env.MONGODB_COLLECTION ?? "spc_report_orders";

    return client.db(dbName).collection(collectionName);
  } catch (error) {
    if (isMongoConnectionError(error)) {
      console.warn("Mongo SPC persistence unavailable; continuing without snapshot storage.");
      return null;
    }

    throw error;
  }
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
      console.warn("SPC snapshot storage skipped because Mongo is unavailable.");
      return {
        id: orderId,
        savedAt: now,
        skipped: true,
      };
    }

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
      console.warn("SPC snapshot lookup skipped because Mongo is unavailable.");
      return [];
    }

    throw error;
  }
};
