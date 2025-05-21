const multer = require('multer');
const path = require('path');
const { v4 } = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', '..', 'images', 'original'));
    },
    filename: function (req, file, cb) {
        const uniqueId = v4();
        cb(null, `${uniqueId}${path.extname(file.originalname)}`);
    }
});

const imagesUpload = multer({ storage: storage });

module.exports = imagesUpload;