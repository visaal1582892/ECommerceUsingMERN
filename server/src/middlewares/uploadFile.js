const multer = require("multer");
const createError = require("http-errors");
const { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } = require("../config");
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if(!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed"), false);
    }
    if(file.size>MAX_FILE_SIZE) {
        return cb(new Error("file size exceeded"), false);
    }
    if(!ALLOWED_FILE_TYPES.includes(file.mimetype)){
        return cb(new Error("file with invalid extension"));
    }
    cb(null, true);
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload;