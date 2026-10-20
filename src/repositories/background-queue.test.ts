import assert from "node:assert/strict";
import test from "node:test";

import { createBackgroundQueue } from "./background-queue";

test("background queue waits for flush before processing jobs", async () => {
  const processed: number[] = [];
  const queue = createBackgroundQueue(async (job: number) => {
    processed.push(job);
  });

  queue.enqueue(1);
  queue.enqueue(2);
  assert.deepEqual(processed, []);

  await queue.flush();

  assert.deepEqual(processed, [1, 2]);
});

test("background queue continues after a failed job and flush waits for all jobs", async () => {
  const processed: number[] = [];
  const queue = createBackgroundQueue(async (job: number) => {
    processed.push(job);

    if (job === 1) {
      throw new Error("expected test failure");
    }
  });

  queue.enqueue(1);
  queue.enqueue(2);

  const originalConsoleError = console.error;
  console.error = () => undefined;

  try {
    await queue.flush();
  } finally {
    console.error = originalConsoleError;
  }

  assert.deepEqual(processed, [1, 2]);
});