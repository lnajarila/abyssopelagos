const mongoose = require('mongoose');

const imageTagSchema = new mongoose.Schema({
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: true
    },
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: true
    }
});

imageTagSchema.index({ tag: 1, image: 1 }, { unique: true });

module.exports = mongoose.model('ImageTag', imageTagSchema);