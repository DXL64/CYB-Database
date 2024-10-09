const express = require('express');
const { minioController } = require('../../controllers');

const router = express.Router();
router.get('/overview', minioController.upload);

module.exports = router
