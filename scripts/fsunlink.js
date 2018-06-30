const fs = require('fs');
const path = require('path');

function deleteThisShit(path) {
    return new Promise((resolve, reject) => {
        fs.unlink(path, err => err ? reject(`Could not delete- ${path}`) : resolve(`scuessfully deleted- ${path}`));
    })
}

module.exports = deleteThisShit;