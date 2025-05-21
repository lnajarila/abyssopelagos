const mongoose = require('mongoose');
const ImageTag = require('./ImageTag.js');

const tagSchema = new mongoose.Schema({
    tagName: { type: String, required: true },
    description: { type: String }
});

tagSchema.methods = {
    async getImages() {
        return await ImageTag.find({ tag: this._id })
            .populate('image')
            .exec();
    }
};

module.exports = mongoose.model('Tag', tagSchema);