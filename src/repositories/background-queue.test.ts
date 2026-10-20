import assert from "node:assert/strict";
import test from "node:test";

import { createBackgroundQueue } from "./background-queue";

test("background queue processes jobs sequentially and flush waits for completion", async () => {
  const processed: number[] = [];
  const queue = createBackgroundQueue(async (job: number) => {
    processed.push(job);
  });

  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);

  await queue.flush();

  assert.deepEqual(processed, [1, 2, 3]);
});

test("background queue continues processing after a job fails", async () => {
  const processed: number[] = [];
  const queue = createBackgroundQueue(async (job: number) => {
    processed.push(job);

    if (job === 1) {
      throw new Error("expected test failure");
    }
  });

  queue.enqueue(1);
  queue.enqueue(2);

  await queue.flush();

  assert.deepEqual(processed, [1, 2]);
});