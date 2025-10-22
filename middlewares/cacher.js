import { myRedis } from "../connect.js";
import { CACHE_ALL_INFO_KEY } from "../config.js";
import { errorMessage } from "../utils/functions/logFunctions.js";
export function allInfoCacher(req, res, next) {
    myRedis
        .get(CACHE_ALL_INFO_KEY)
        .then((cache) => {
        if (cache) {
            const cacheObject = JSON.parse(cache);
            return res.status(200).json({
                success: true,
                message: "Payers information retrieved successfully",
                data: cacheObject,
            });
        }
        else {
            next();
        }
    })
        .catch((err) => errorMessage(err));
}
