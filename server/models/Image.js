require('dotenv').config();

const mongoose = require('mongoose');
const PORT = process.env.PORT;

const imageSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    fileSize: { type: Number, required: true },
    format: { type: String, required: true },
    mimeType: { type: String, required: true },
}, { timestamps: true });

imageSchema.virtual('originalPath').get(function() {
    return `http://localhost:${PORT}/images/original/${this.fileName}`;
});

imageSchema.virtual('thumbnailPath').get(function() {
    return `http://localhost:${PORT}/images/thumbnail/${this.fileName}`;
});

module.exports = mongoose.model('ImageModel', imageSchema);