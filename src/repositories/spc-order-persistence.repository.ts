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
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    throw new Error(
      "Mongo URI não configurada. Defina SPC_MONGO_URI ou MONGO_URI no ambiente.",
    );
  }

  return mongoUri;
};

const getMongoCollection = async () => {
  const uri = getMongoUri();

  if (!mongoClient) {
    mongoClient = new MongoClient(uri);
    await mongoClient.connect();
  }

  const dbName = process.env.MONGODB_NAME ?? "credits";
  const collectionName = process.env.MONGODB_COLLECTION ?? "spc_report_orders";

  return mongoClient.db(dbName).collection(collectionName);
};

export const saveSpcOrderSnapshot = async (
  payload: Spc325OrderSnapshot,
) => {
  const collection = await getMongoCollection();
  const now = new Date();

  const { orderId, ...snapshotData } = payload;

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
  };
};

export const findSpcOrderSnapshotsByOrderIds = async (orderIds: string[]) => {
  if (orderIds.length === 0) {
    return [];
  }

  const collection = await getMongoCollection();

  const snapshots = await collection
    .find({ _id: { $in: orderIds as any[] } } as any)
    .toArray();

  return snapshots as unknown as Array<{
    _id: string;
    xml?: string;
    json?: unknown;
    result?: unknown;
  }>;
};
