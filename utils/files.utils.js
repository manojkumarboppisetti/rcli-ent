const fs = require('fs/promises');
const path = require('path');

const isExists = async (path) => {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
};

const createFile = async (filePath, data) => {
    try {
        const dirname = path.dirname(filePath);
        const exist = await isExists(dirname);
        if (!exist) {
            await fs.mkdir(dirname, {recursive: true});
        }
        await fs.writeFile(filePath, data, 'utf8');
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {createFile}
