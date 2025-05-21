const express = require('express');
const router = express.Router();

const upload = require('./configMulter.js');
const processThumbnail = require('./processThumbnail.js');
const createImageDocument = require('./createImageDocument.js');

router.use(upload.single('image'));
router.use(processThumbnail);
router.use(createImageDocument);

module.exports = router;