import { getAllPayersInfo, getByMatricNo, getPaginateInfoFunction, getTotalPayersAndPages, insertPayerInfo, } from "../utils/functions/dbFunctions.js";
import { CACHE_ALL_INFO_KEY, CACHE_DURATION, JWT_SECRET, MYPASSWORD, MYUSERNAME, } from "../config.js";
import jwt from "jsonwebtoken";
import { payerSchema } from "../models/payerSchema.js";
import { errorMessage } from "../utils/functions/logFunctions.js";
import { fileUploadToMegaFolder } from "../utils/functions/fileUploadFunctions.js";
import { setCache } from "../utils/functions/helperFunctions.js";
//pagination
export async function paginateInfoController(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const offset = (page - 1) * perPage;
        if (page < 1 || perPage < 1)
            return res
                .status(400)
                .json({ success: false, message: "Invalid page or perPage value" });
        const totalPayerAndPages = await getTotalPayersAndPages(perPage);
        const paginatedPayersInfo = await getPaginateInfoFunction(perPage, offset);
        return res.status(200).json({
            success: true,
            message: "Paginated information queries successfully",
            currentPage: page,
            perPage,
            totalPayers: totalPayerAndPages?.totalPayers.totalPayers,
            totalPages: totalPayerAndPages?.totalPages,
            hasNextPage: page < totalPayerAndPages.totalPages,
            hasPreviousPage: page > 1,
            data: paginatedPayersInfo,
        });
    }
    catch (error) {
        errorMessage(error);
    }
}
export async function getAllPayerInfoController(req, res) {
    try {
    }
    catch (error) {
        errorMessage(error);
    }
    const allInfo = await getAllPayersInfo();
    const stringifiedInfo = JSON.stringify(allInfo);
    /* myRedis.set(CACHE_ALL_INFO_KEY, stringifiedInfo, {
      expiration: { type: "EX", value: CACHE_DURATION },
    }); */
    setCache(CACHE_ALL_INFO_KEY, stringifiedInfo, CACHE_DURATION);
    return res.status(200).json({
        success: true,
        message: "Payers information retrieved successfully",
        data: allInfo,
    });
}
export function adminLoginController(req, res) {
    try {
        const { username, password } = req.body;
        if (username !== MYUSERNAME || password !== MYPASSWORD)
            return res //include status code later
                .json({
                success: false,
                message: "Incorrect username or password",
            });
        const token = jwt.sign({ user: "admin" }, JWT_SECRET, {
            expiresIn: "1h",
        });
        return res.json({ success: true, message: "Login successful", token });
    }
    catch (error) {
        errorMessage(error);
    }
}
export async function submitPayerInfoController(req, res) {
    try {
        if (!req.file)
            return res.status(400).send("No file uploaded");
        const { originalname, buffer } = req.file;
        const info = req.body;
        const { error, data } = payerSchema.safeParse(info);
        if (error) {
            errorMessage(error.issues[0].message);
            return res
                .status(403)
                .json({ success: false, message: error.issues[0].message });
        }
        const matricNo = await getByMatricNo(data.matricNo);
        if (matricNo)
            return res.status(409).json({
                success: false,
                message: "This matriculation number already exists",
            });
        const receiptLink = await fileUploadToMegaFolder(originalname, buffer);
        data ? insertPayerInfo(data, receiptLink) : null;
        return res
            .status(201)
            .json({
            success: true,
            message: "Data saved successfully",
        });
    }
    catch (error) {
        errorMessage(error);
    }
}
export async function fileUpLoadController(req, res) {
    try {
        if (!req.file)
            return res.status(400).send("No file uploaded");
        const { originalname, buffer } = req.file;
        console.log(await fileUploadToMegaFolder(originalname, buffer));
        res.sendStatus(200);
    }
    catch (error) {
        errorMessage(error);
    }
}
