import { NativeConnection, Worker } from "@temporalio/worker";
import * as activities from "./activities";
import { config } from "./config";

async function run() {
  const connection = await NativeConnection.connect({ address: config.temporalAddress });

  const worker = await Worker.create({
    connection,
    namespace: config.temporalNamespace,
    taskQueue: config.taskQueue,
    workflowsPath: require.resolve("./workflows/hotelWorkflow"),
    activities,
  });

  console.log(`[worker] polling task queue "${config.taskQueue}" at ${config.temporalAddress}`);
  await worker.run();
}

run().catch((err) => {
  console.error("[worker] fatal error", err);
  process.exit(1);
});
