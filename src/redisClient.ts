import { createClient, RedisClientType } from "redis";
import { config } from "./config";

let client: RedisClientType | null = null;

export async function getRedisClient(): Promise<RedisClientType> {
  if (client && client.isOpen) return client;
  client = createClient({ url: config.redisUrl });
  client.on("error", (err) => console.error("[redis] client error", err));
  await client.connect();
  return client;
}

export function hotelsKey(city: string): string {
  return `hotels:${city.toLowerCase()}`;
}
