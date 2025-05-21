const express = require('express');
const router = express.Router();

const uploadImage = require('./uploadImage.js');
const processThumbnail = require('./processThumbnail.js');
const createImageDocument = require('./createImageDocument.js');

router.use(uploadImage);
router.use(processThumbnail);
router.use(createImageDocument);

module.exports = router;