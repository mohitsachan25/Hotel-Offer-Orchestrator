import { Connection, WorkflowClient } from "@temporalio/client";
import { config } from "./config";

let client: WorkflowClient | null = null;

export async function getWorkflowClient(): Promise<WorkflowClient> {
  if (client) return client;
  const connection = await Connection.connect({ address: config.temporalAddress });
  client = new WorkflowClient({ connection, namespace: config.temporalNamespace });
  return client;
}
