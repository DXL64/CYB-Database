const express = require('express');
const multer = require('multer');
const validate = require('../../middlewares/validate');
const { minioController } = require('../../controllers');
const { minioValidation } = require('../../validations');
const { minioService } = require('../../services');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', validate(minioValidation.getBuckets), minioController.getBuckets);
router.post('/upload', upload.single('file'), minioController.putObject);
router.post('/test', upload.single('file'), minioController.test);

minioService.createBucket();
module.exports = router;
