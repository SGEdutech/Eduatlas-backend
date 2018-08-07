const path = require('path');
const multer = require('multer');

function nameThatBitch(req, file, cb) {
    cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
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
    destination: './public/images/eventPics',
    filename: nameThatBitch
});

const uploadEventCoverPic = multer({
    storage: eventCoverPicStorage,
    // limits: {fileSize: 1024 * 1024},  // Unit Bytes
    fileFilter: checkFileType
}).any();

function eventCoverPicMiddleware(req, res, next) {
    uploadEventCoverPic(req, res, err => {
        if (err) console.error(err);
        next();
    })
}

const schoolCoverPicStorage = multer.diskStorage({
    destination: './public/images/schoolPics',
    filename: nameThatBitch
});

const uploadSchoolCoverPic = multer({
    storage: schoolCoverPicStorage,
    // limits: {fileSize: 1024 * 1024},  // Unit Bytes
    fileFilter: checkFileType
}).any();

function schoolCoverPicMiddleware(req, res, next) {
    uploadSchoolCoverPic(req, res, err => {
        if (err) console.error(err);
        next();
    })
}

const tuitionCoverPicStorage = multer.diskStorage({
    destination: './public/images/tuitionPics',
    filename: nameThatBitch
});

const uploadTuitionCoverPic = multer({
    storage: tuitionCoverPicStorage,
    // limits: {fileSize: 1024 * 1024},  // Unit Bytes
    fileFilter: checkFileType
}).any();

function tuitionCoverPicMiddleware(req, res, next) {
    uploadTuitionCoverPic(req, res, err => {
        if (err) console.error(err);
        next();
    })
}

const userCoverPicStorage = multer.diskStorage({
    destination: './public/images/userPics',
    filename: nameThatBitch
});

const uploadUserCoverPic = multer({
    storage: userCoverPicStorage,
    // limits: {fileSize: 1024 * 1024},  // Unit Bytes
    fileFilter: checkFileType
}).any();

function userCoverPicMiddleware(req, res, next) {
    uploadTuitionCoverPic(req, res, err => {
        if (err) console.error(err);
        next();
    })
}

exports = module.exports = {
    eventCoverPicMiddleware,
    schoolCoverPicMiddleware,
    tuitionCoverPicMiddleware,
    userCoverPicMiddleware
};