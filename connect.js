import sqlite3 from "sqlite3";
import { Storage } from "megajs";
import { createClient } from "redis";
import { DB_NAME, MEGA_EMAIL, MEGA_PASSWORD, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_USERNAME, } from "./config.js";
import { payersModel } from "./utils/constants.js";
import { createTableCallback, dbConnectionCallback, } from "./utils/functions/dbFunctions.js";
import { errorMessage, successMessage, } from "./utils/functions/logFunctions.js";
//redis
export const myRedis = createClient({
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT,
    },
});
//export const myRedis = createClient();
myRedis.on("error", (err) => console.log("Redis Client Error", err));
await myRedis.connect();
//sqlite
export const db = new sqlite3.Database(DB_NAME, dbConnectionCallback);
db.run(payersModel, createTableCallback);
//MEGA
export const mega = new Storage({
    email: MEGA_EMAIL,
    password: MEGA_PASSWORD,
});
await mega.ready
    .then(() => successMessage("mega connected successfully"))
    .catch((reason) => errorMessage(reason));
