//SQL
export const payersModel = `
  CREATE TABLE IF NOT EXISTS payers(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName VARCHAR(70) NOT NULL,
    matricNo VARCHAR(11) NOT NULL UNIQUE,
    level VARCHAR(3) NOT NULL,
    email TEXT NOT NULL,
    department VARCHAR(3) NOT NULL,
    phoneNo VARCHAR(11) NOT NULL,
    payerName VARCHAR(70) NOT NULL,
    receiptLink VARCHAR(80) NOT NULL,
    createdAt DATETIME DEFAULT (datetime('now', 'localtime')) NOT NULL
  );`;
export const insertPayerInfoSQL = `INSERT INTO payers(fullName, matricNo, level, email, department, phoneNo, payerName, receiptLink)  VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
export const getAllSQL = "SELECT fullName, matricNo, level, department, email, phoneNo, receiptLink FROM payers";
export const getMatricNo = "SELECT matricNo from payers WHERE matricNo = ?";
export const countPayers = "SELECT COUNT(fullName) AS totalPayers FROM payers";
export const getPaginatedInfo = "SELECT fullName, matricNo, level, department FROM payers LIMIT ? OFFSET ?";
