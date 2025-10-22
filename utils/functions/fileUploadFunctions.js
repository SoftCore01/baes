import { MEGA_FOLDER } from "../../config.js";
import { mega } from "../../connect.js";
import { errorMessage } from "./logFunctions.js";
//regular upload into mega drive
export async function fileUploadToMegaDriveFunction(originalname, buffer) {
    try {
        const uploaded = mega.upload(originalname, buffer).complete;
        return (await uploaded).link(false, (error) => error ? errorMessage(error) : null); // returns file link
    }
    catch (error) {
        errorMessage(error);
    }
}
//upload into mega folder
export async function fileUploadToMegaFolder(originalname, buffer) {
    try {
        const folder = await getOrCreateMegaFolder(MEGA_FOLDER);
        const uploaded = folder.upload(originalname, buffer).complete;
        return (await uploaded).link(false, (error) => error ? errorMessage(error) : null);
    }
    catch (error) {
        errorMessage(error);
    }
}
//create or get mega folder
async function getOrCreateMegaFolder(folderName) {
    try {
        return new Promise((resolve, reject) => {
            const existingFolder = mega.root.children?.find((child) => child.name === folderName && child.directory);
            if (existingFolder) {
                return resolve(existingFolder);
            }
            mega.root.mkdir(folderName, (err, folder) => {
                if (err)
                    return reject(err);
                resolve(folder);
            });
        });
    }
    catch (error) {
        errorMessage(error);
    }
}
