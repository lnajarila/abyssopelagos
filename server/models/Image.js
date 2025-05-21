require('dotenv').config();

const mongoose = require('mongoose');
const PORT = process.env.PORT;

const imageSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    sourceType: { type: String, required: true },
    sourceUrl: { type: String, default: '' },
    fileSize: { type: Number, required: true },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 }
}, { timestamps: true });

imageSchema.virtual('originalPath').get(function() {
    return `http://localhost:${PORT}/images/original/${this.filename}`;
});

imageSchema.virtual('thumbnailPath').get(function() {
    return `http://localhost:${PORT}/images/thumbnail/${this.filename}`;
});

imageSchema.virtual('formattedFileSize').get(function() {
    const units = ['byte', 'kilobyte', 'megabyte', 'gigabyte'];
    const unit = Math.floor(Math.log(this.fileSize) / Math.log(1024));
    const convertedSize = this.fileSize / 1024 ** unit;
    const options = {
        maximumFractionDigits: 2,
        style: "unit",
        unit: units[unit]
    };

    return new Intl.NumberFormat("en", options).format(convertedSize);
});

imageSchema.virtual('uploadDate').get(function() {
    const date = new Date(this.createdAt);
    const options = {
        dateStyle: "medium",
        timeStyle: "medium",
        hour12: false,
        timeZone: "+08:00"
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
});

imageSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Image', imageSchema);