import { MongoClient, ObjectId } from "mongodb";

export type PlatformLogActor = {
  kind: "USER" | "ADMIN" | "SYSTEM";
  userId?: string | null;
  name?: string | null;
  email?: string | null;
  role?: string | null;
};

export type PlatformLogSource = "credits-platform" | "credits-platform-manager" | "SYSTEM" | "UNKNOWN";

export type PlatformLogEntryInput = {
  action: string;
  entity: string;
  actor?: PlatformLogActor;
  actorUserId?: string | null;
  actorName?: string | null;
  actorRole?: string | null;
  previousState?: unknown;
  newState?: unknown;
  companyId?: string | null;
  companyName?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  requestPath?: string | null;
  source?: PlatformLogSource | string | null;
  metadata?: Record<string, unknown> | null;
};

export type PlatformLogEntry = {
  _id: string;
  action: string;
  entity: string;
  actor: PlatformLogActor;
  previousState: unknown;
  newState: unknown;
  companyId?: string | null;
  companyName?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  requestPath?: string | null;
  source: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
};

let mongoClient: MongoClient | null = null;

const getMongoUri = () => {
  return process.env.MONGODB_URI ?? process.env.SPC_MONGO_URI ?? "";
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

export const isMongoClientReady = (client: MongoClient | null | undefined) => {
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

const getMongoCollection = async () => {
  const uri = getMongoUri();

  if (!uri) {
    return null;
  }

  const client = await ensureMongoClient(uri);

  const dbName = process.env.MONGODB_NAME ?? "credits";
  const collectionName = process.env.MONGODB_LOGS_COLLECTION ?? "platform_logs";

  return client.db(dbName).collection(collectionName);
};

export const normalizePlatformSource = (value?: PlatformLogSource | string | null) => {
  if (!value) {
    return "SYSTEM";
  }

  const normalized = String(value).trim().toLowerCase();

  if (normalized === "credits-platform-manager" || normalized === "credits-platform") {
    return normalized;
  }

  if (normalized === "system") {
    return "SYSTEM";
  }

  return normalized || "UNKNOWN";
};

export const normalizePlatformLogEntry = (input: PlatformLogEntryInput) => {
  const actor = input.actor ?? {
    kind: "SYSTEM" as const,
    userId: input.actorUserId ?? null,
    name: input.actorName ?? null,
    role: input.actorRole ?? null,
  };

  return {
    action: input.action,
    entity: input.entity,
    actor: {
      kind: actor.kind ?? "SYSTEM",
      userId: actor.userId ?? null,
      name: actor.name ?? null,
      email: actor.email ?? null,
      role: actor.role ?? null,
    },
    previousState: input.previousState === undefined ? null : JSON.parse(JSON.stringify(input.previousState)),
    newState: input.newState === undefined ? null : JSON.parse(JSON.stringify(input.newState)),
    companyId: input.companyId ?? null,
    companyName: input.companyName ?? null,
    ip: input.ip ?? null,
    userAgent: input.userAgent ?? null,
    requestPath: input.requestPath ?? null,
    source: normalizePlatformSource(input.source),
    metadata: input.metadata ?? {},
  };
};

export const savePlatformLog = async (input: PlatformLogEntryInput) => {
  const collection = await getMongoCollection();

  if (!collection) {
    return null;
  }

  const normalized = normalizePlatformLogEntry(input);
  const now = new Date();
  const document = {
    _id: new ObjectId().toHexString(),
    ...normalized,
    createdAt: now,
    updatedAt: now,
  };

  try {
    await collection.insertOne(document as any);
    return document as PlatformLogEntry;
  } catch (error) {
    const errorName = (error as any)?.name;

    if (errorName !== "MongoTopologyClosedError" && errorName !== "MongoNotConnectedError") {
      throw error;
    }

    const uri = getMongoUri();

    if (!uri) {
      return null;
    }

    const reconnectClient = await ensureMongoClient(uri);
    const dbName = process.env.MONGODB_NAME ?? "credits";
    const collectionName = process.env.MONGODB_LOGS_COLLECTION ?? "platform_logs";
    const retryCollection = reconnectClient.db(dbName).collection(collectionName);

    await retryCollection.insertOne(document as any);

    return document as PlatformLogEntry;
  }
};

export const paginatePlatformLogs = ({
  total,
  page,
  limit,
}: {
  total: number;
  page: number;
  limit: number;
}) => {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), 100) : 20;
  const safeTotal = Number.isFinite(total) && total >= 0 ? Math.floor(total) : 0;
  const totalPages = safeTotal === 0 ? 0 : Math.max(1, Math.ceil(safeTotal / safeLimit));

  return {
    total: safeTotal,
    page: safePage,
    limit: safeLimit,
    totalPages,
    hasPreviousPage: safePage > 1 && safeTotal > 0,
    hasNextPage: safePage < totalPages,
  };
};

export const listPlatformLogs = async (limit = 20, page = 1) => {
  const collection = await getMongoCollection();

  if (!collection) {
    return {
      logs: [] as PlatformLogEntry[],
      total: 0,
      page: 1,
      limit: Math.max(1, Number(limit) || 20),
      totalPages: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    };
  }

  const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), 100) : 20;
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const total = await collection.countDocuments({});
  const pagination = paginatePlatformLogs({ total, page: safePage, limit: safeLimit });
  const skip = (safePage - 1) * safeLimit;

  const docs = await collection
    .find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(safeLimit)
    .toArray();

  return {
    logs: docs as unknown as PlatformLogEntry[],
    total: pagination.total,
    page: pagination.page,
    limit: pagination.limit,
    totalPages: pagination.totalPages,
    hasPreviousPage: pagination.hasPreviousPage,
    hasNextPage: pagination.hasNextPage,
  };
};
