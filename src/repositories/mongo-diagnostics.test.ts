import assert from "node:assert/strict";
import test from "node:test";

import { describeMongoFailure, getMongoClientOptions } from "./spc-order-persistence.repository";

test("describeMongoFailure includes connection details and error message", () => {
  const details = describeMongoFailure(
    { name: "MongoServerSelectionError", code: "TIMEOUT", message: "Server selection timed out" },
    "Mongo SPC persistence unavailable; continuing without snapshot storage.",
  );

  assert.match(details, /Mongo SPC persistence unavailable/);
  assert.match(details, /name=MongoServerSelectionError/);
  assert.match(details, /code=TIMEOUT/);
  assert.match(details, /Server selection timed out/);
  assert.match(details, /uri=/);
});

test("getMongoClientOptions does not force tls for mongodb+srv URIs", () => {
  const options = getMongoClientOptions("mongodb+srv://user:pass@cluster.mongodb.net/credits?retryWrites=true&w=majority&authSource=admin");

  assert.equal((options as any).tls, undefined);
});

test("describeMongoFailure does not mark mongodb+srv URIs as tls-enabled unless explicitly configured", () => {
  process.env.MONGODB_URI = "mongodb+srv://user:pass@cluster.mongodb.net/credits?retryWrites=true&w=majority&authSource=admin";

  const details = describeMongoFailure(
    { name: "MongoServerSelectionError", code: "TIMEOUT", message: "tlsv1 alert internal error" },
    "Mongo audit collection unavailable; skipping platform log save.",
  );

  assert.match(details, /tls=false/);
  delete process.env.MONGODB_URI;
});
