import { Router } from "express";
import { authenticateToken } from "../middlewares/validators.js";
import { adminLoginController, getAllPayerInfoController, paginateInfoController, } from "../controllers/routerControllers.js";
import { allInfoCacher } from "../middlewares/cacher.js";
export const router = Router();
//router.post("/payer", submitPayerInfoController);
router.post("/adminLogin", adminLoginController);
router.get("/allPayerInfo", authenticateToken, allInfoCacher, getAllPayerInfoController);
router.get("/paginatedPayerInfo", authenticateToken, paginateInfoController);
