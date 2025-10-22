import { google } from "googleapis";
import fs from "fs";
import readline from "readline";
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
const TOKEN_PATH = "token.json";
// 1️⃣ Load client secrets
const credentials = JSON.parse(fs.readFileSync("client_secret.json", "utf8"));
const { client_id, client_secret, redirect_uris } = credentials.installed || credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
// 2️⃣ Ask user to authorize
const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
});
console.log("Authorize this app by visiting:", authUrl);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question("Enter the code from that page: ", async (code) => {
    rl.close();
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
    console.log("✅ Refresh token stored in token.json");
});
