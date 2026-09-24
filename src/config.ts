import "dotenv/config";

export const config = {
  port: parseInt(process.env.PORT || "3000", 10),
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  temporalAddress: process.env.TEMPORAL_ADDRESS || "localhost:7233",
  temporalNamespace: process.env.TEMPORAL_NAMESPACE || "default",
  taskQueue: process.env.TEMPORAL_TASK_QUEUE || "hotel-task-queue",
  supplierAUrl: process.env.SUPPLIER_A_URL || "http://localhost:3000/supplierA/hotels",
  supplierBUrl: process.env.SUPPLIER_B_URL || "http://localhost:3000/supplierB/hotels",
};
