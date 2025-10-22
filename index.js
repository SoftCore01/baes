import { FORMPATH, PORT, ADMINLOGINPATH, ADMINPAGEPATH } from "./config.js";
import "./connect.js";
import express, { json } from "express";
import { errorMessage, successMessage, } from "./utils/functions/logFunctions.js";
import { router } from "./routers/router.js";
import multer from "multer";
import { submitPayerInfoController } from "./controllers/routerControllers.js";
const upload = multer({ storage: multer.memoryStorage() });
const app = express();
app.post("/upload", upload.single("file"), submitPayerInfoController);
app.use(json());
app.use("/", express.static(FORMPATH));
app.use("/adminLogin", express.static(ADMINLOGINPATH));
app.use("/adminPage", express.static(ADMINPAGEPATH));
app.use("/api", router);
app.listen(PORT, (err) => {
    if (err)
        errorMessage(err);
    successMessage(`Server running on port ${PORT}`);
});
