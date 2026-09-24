import { Router } from "express";
import axios from "axios";
import { config } from "../config";

export const healthRouter = Router();


healthRouter.get("/health", async (_req, res) => {
  const checkSupplier = async (url: string) => {
    try {
      await axios.get(url, { params: { city: "delhi" }, timeout: 3000 });
      return "up" as const;
    } catch {
      return "down" as const;
    }
  };

  const [supplierA, supplierB] = await Promise.all([
    checkSupplier(config.supplierAUrl),
    checkSupplier(config.supplierBUrl),
  ]);

  const allUp = supplierA === "up" && supplierB === "up";

  res.status(allUp ? 200 : 503).json({
    status: allUp ? "healthy" : "degraded",
    suppliers: { supplierA, supplierB },
    timestamp: new Date().toISOString(),
  });
});
