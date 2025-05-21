const multer = require('multer');
const path = require('path');
const { v4 } = require('uuid');

const uploadImage = async (req, res, next) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, 'images', 'original'));
        },
        filename: function (req, file, cb) {
            const uniqueId = v4();
            cb(null, `${uniqueId}${path.extname(file.originalname)}`);
        }
    });

    const upload = multer({ storage: storage });
    upload.single('image');
    next();
};

module.exports = uploadImage;