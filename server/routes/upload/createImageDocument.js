const mongoose = require('mongoose');
const Image = require('../../models/Image');

const createImageDocument = async (req, res, next) => {
    await Image.create({ filename: req.file.filename });
    next();
};

module.exports = createImageDocument;