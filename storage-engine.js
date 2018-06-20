const path = require('path');
const multer = require('multer');

function nameThatBitch(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
}

function checkFileType(req, file, cb) {
    const allowedFileTypes = /jpeg|jpg|png|gif|svg/i;
    const isExtensionValid = allowedFileTypes.test(path.extname(file.originalname));
    const isMimeValid = allowedFileTypes.test(file.mimetype);
    if (isExtensionValid && isMimeValid) {
        cb(null, true);
    } else {
        cb(new Error('Err: Image Only'), false);
    }
}

const eventCoverPicStorage = multer.diskStorage({
    destination: './public/images/eventCoverPics',
    filename: nameThatBitch
});

const uploadEventCoverPic = multer({
    storage: eventCoverPicStorage,
    // limits: {fileSize: 10},  // Unit Bytes
    fileFilter: checkFileType
}).single('eventCoverPic');

function eventCoverPicMiddleware(req, res, next) {
    uploadEventCoverPic(req, res, err => {
        if (err) console.error(err);
        next();
    })
}

const schoolCoverPicStorage = multer.diskStorage({
    destination: './public/images/schoolCoverPics',
    filename: nameThatBitch
});

const uploadSchoolCoverPic = multer({
    storage: schoolCoverPicStorage,
    // limits: {fileSize: 10},  // Unit Bytes
    fileFilter: checkFileType
}).single('schoolCoverPic');

function schoolCoverPicMiddleware(req, res, next) {
    uploadSchoolCoverPic(req, res, err => {
        if (err) console.error(err);
        next();
    })
}

const tuitionCoverPicStorage = multer.diskStorage({
    destination: './public/images/tuitionCoverPics',
    filename: nameThatBitch
});

const uploadTuitionCoverPic = multer({
    storage: tuitionCoverPicStorage,
    limits: {fileSize: 1024 * 750},  // Unit Bytes
    fileFilter: checkFileType
}).single('tuitionCoverPic');

function tuitionCoverPicMiddleware(req, res, next) {
    uploadTuitionCoverPic(req, res, err => {
        if (err) console.error(err);
        next();
    })
}

exports = module.exports = {
    eventCoverPicMiddleware,
    schoolCoverPicMiddleware,
    tuitionCoverPicMiddleware
};