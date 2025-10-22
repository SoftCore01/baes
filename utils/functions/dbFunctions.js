import { db } from "../../connect.js";
import { countPayers, getAllSQL, getMatricNo, getPaginatedInfo, insertPayerInfoSQL, } from "../constants.js";
import { errorMessage, successMessage } from "./logFunctions.js";
export function createTableCallback(err) {
    if (err)
        errorMessage(err);
    successMessage(`Table created successfully`);
}
export function dbConnectionCallback(err) {
    if (err)
        errorMessage(err);
    successMessage("Database connected successfully");
}
//SET OPERATIONS
function setOperation(sql, ...values) {
    try {
        db.run(sql, [...values], (err) => {
            if (err)
                throw new Error(err.message);
        });
    }
    catch (error) {
        errorMessage(error);
    }
}
export function insertPayerInfo(payerInfo, receiptLink) {
    setOperation(insertPayerInfoSQL, ...Object.values(payerInfo), receiptLink);
}
//GET OPERATIONS
//GET ALL
function getAll(sql, ...values) {
    return new Promise((resolve, reject) => {
        db.all(sql, [...values], (err, rows) => {
            if (err)
                reject(err);
            resolve(rows);
        });
    });
}
export async function getAllPayersInfo() {
    try {
        const response = await getAll(getAllSQL);
        return response;
    }
    catch (error) {
        errorMessage(error);
    }
}
//GET ONE
function getFirst(sql, ...values) {
    return new Promise((resolve, reject) => {
        db.get(sql, [...values], (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
}
export async function getByMatricNo(matricNo) {
    try {
        const response = await getFirst(getMatricNo, matricNo);
        return response;
    }
    catch (error) {
        errorMessage(error);
    }
}
export async function getTotalPayersAndPages(perPage) {
    try {
        const totalPayers = (await getFirst(countPayers));
        const totalPages = Math.ceil(totalPayers.totalPayers / perPage);
        return { totalPayers, totalPages };
    }
    catch (error) {
        errorMessage(error);
    }
}
export async function getPaginateInfoFunction(perPage, offSet) {
    try {
        const payers = await getAll(getPaginatedInfo, perPage, offSet);
        return payers;
    }
    catch (error) {
        errorMessage(error);
    }
}
