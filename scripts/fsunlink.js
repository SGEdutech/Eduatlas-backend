const fs = require('fs');

function deleteFile(path) {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if (err) throw err;
            reject(err)
        });
        resolve(console.log('successfully deleted-' + path))
    })
}