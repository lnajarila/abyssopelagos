const express = require('express');

const Tag = require('../models/Tag.js');
const ImageTag = require('../models/ImageTag.js');

const tagsRouter = express.Router();

tagsRouter.get('/', async(req, res) => {
    try {
        const tags = await Tag.find({}).sort({ tagName: 1 });

        const tagsWithCount = await Promise.all(
            tags.map(async (tag) => {
                const imageTagCount = await ImageTag.countDocuments({ tag: tag._id });
                return {
                    ...tag.toJSON(),
                    count: imageTagCount
                };
            })
        );

        res.json(tagsWithCount);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `${err.message}: Failed to get tags` });
    }
});

module.exports = tagsRouter;