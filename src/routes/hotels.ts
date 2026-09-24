import { Router } from "express";
import { getWorkflowClient } from "../temporalClient";
import { getRedisClient, hotelsKey } from "../redisClient";
import { config } from "../config";

import type { hotelOfferWorkflow } from "../workflows/hotelWorkflow";

export const hotelsRouter = Router();


hotelsRouter.get("/api/hotels", async (req, res) => {
  const city = String(req.query.city || "").trim();
  if (!city) {
    return res.status(400).json({ error: "query param 'city' is required" });
  }

  const minPrice = req.query.minPrice !== undefined ? Number(req.query.minPrice) : undefined;
  const maxPrice = req.query.maxPrice !== undefined ? Number(req.query.maxPrice) : undefined;

  if (
    (minPrice !== undefined && Number.isNaN(minPrice)) ||
    (maxPrice !== undefined && Number.isNaN(maxPrice))
  ) {
    return res.status(400).json({ error: "minPrice/maxPrice must be numbers" });
  }

  try {
    const client = await getWorkflowClient();

   
    const handle = await client.start<typeof hotelOfferWorkflow>("hotelOfferWorkflow", {
      taskQueue: config.taskQueue,
      workflowId: `hotel-offer-${city.toLowerCase()}-${Date.now()}`,
      args: [city],
    });

    const result = await handle.result();

    if (minPrice === undefined && maxPrice === undefined) {
      return res.json(result);
    }

    
    const redis = await getRedisClient();
    const lo = minPrice ?? "-inf";
    const hi = maxPrice ?? "+inf";
    const members = await redis.zRangeByScore(hotelsKey(city), lo, hi);
    const filtered = members.map((m) => JSON.parse(m));
    return res.json(filtered);
  } catch (err) {
    console.error("[/api/hotels] error", err);
    return res.status(500).json({ error: "Failed to fetch hotel offers" });
  }
});
