require('dotenv').config();

const mongoose = require('mongoose');
const PORT = process.env.PORT;

const imageSchema = new mongoose.Schema({
    filename: { type: String, required: true }
}, { timestamps: true });

imageSchema.virtual('originalPath').get(function() {
    return `http://localhost:${PORT}/images/original/${this.filename}`;
});

imageSchema.virtual('thumbnailPath').get(function() {
    return `http://localhost:${PORT}/images/thumbnail/${this.filename}`;
});

imageSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Image', imageSchema);