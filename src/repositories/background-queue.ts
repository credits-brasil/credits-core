type QueueWaiter = () => void;

export const createBackgroundQueue = <T>(processJob: (job: T) => Promise<unknown>) => {
  const jobs: T[] = [];
  const waiters: QueueWaiter[] = [];
  let isProcessing = false;

  const processJobs = async () => {
    if (isProcessing) {
      return;
    }

    isProcessing = true;

    while (jobs.length > 0) {
      const job = jobs.shift();

      if (job === undefined) {
        continue;
      }

      try {
        await processJob(job);
      } catch (error) {
        console.error("Background queue job failed.", error);
      }
    }

    isProcessing = false;
    waiters.splice(0).forEach((resolve) => resolve());
  };

  return {
    enqueue(job: T) {
      jobs.push(job);

      if (!isProcessing) {
        setImmediate(() => void processJobs());
      }
    },
    flush() {
      if (!isProcessing && jobs.length === 0) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        waiters.push(resolve);
      });
    },
  };
};