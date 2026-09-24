import { Context } from "@temporalio/activity";
import { getRedisClient, hotelsKey } from "../redisClient";
import type { HotelOffer } from "../workflows/hotelWorkflow";


export async function saveHotelsToRedis(city: string, hotels: HotelOffer[]): Promise<void> {
  const log = Context.current().log;
  const client = await getRedisClient();
  const key = hotelsKey(city);

  await client.del(key); // clear stale entries for this city before re-writing
  if (hotels.length === 0) return;

  const entries = hotels.map((h) => ({ score: h.price, value: JSON.stringify(h) }));
  await client.zAdd(key, entries);
  log.info("Saved hotels to Redis", { city, count: hotels.length });
}
