import path from 'path';
import fs from 'fs';
import http from 'http';
import https from 'https';

class DynamicFile {
    constructor(fileName, basePath = "./") {
        this.basePath = basePath;
        this.fileName = fileName;
    }

    getFilePath(obj) {
        const fileName = this.fileName instanceof Function ? this.fileName(obj) : this.fileName;

        return path.resolve('./static/data/', this.basePath, fileName);
    }

    remove(obj) {
        const currentFile = this.getFilePath(obj);

        if (fs.existsSync(currentFile)) {
            fs.unlinkSync(currentFile);
        }
    }

    save(obj, tempFile) {
        // Get data on new image
        const source = DynamicFile.getTempFilePath(tempFile);

        // Move new image
        const destination = this.getFilePath(obj);

        fs.renameSync(source, destination);
    }

    async saveFromUrl(obj, url) {
        // Move new image
        const destination = this.getFilePath(obj);

        let requester = url.indexOf('https') === 0 ? https : http;

        return new Promise((resolve, reject) => {
            let file = fs.createWriteStream(destination);

            let request = requester.get(url, function(response) {
                response.pipe(file);

                response.on('end', () => {
                    resolve();
                });
            });
        });
    }

    static getTempFilePath(tempFile) {
        return path.resolve('./static/data/temp', tempFile);
    }

    static getModificationTime(path, milli = false) {
        let stat = fs.statSync(path);

        return milli ? stat.mtime.getTime() : Math.floor(stat.mtime.getTime()/1000);
    }
}

export default DynamicFile;