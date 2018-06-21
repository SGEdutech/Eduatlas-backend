const fs = require('fs');

function deleteFile(path) {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if (err) {
                // throw err;
                reject(err)
            } else {
                resolve('successfully deleted-' + path)
            }
        });
    })
}

exports.deleteFile = deleteFile;