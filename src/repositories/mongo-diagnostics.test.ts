import assert from "node:assert/strict";
import test from "node:test";

import { describeMongoFailure } from "./spc-order-persistence.repository";

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
