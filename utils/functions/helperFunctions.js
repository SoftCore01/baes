import { myRedis } from "../../connect.js";
export function setCache(cacheKey, cacheValue, cacheDuration) {
    myRedis.set(cacheKey, cacheValue, {
        expiration: { type: "EX", value: cacheDuration },
    });
}
