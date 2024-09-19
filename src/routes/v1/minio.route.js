const express = require('express');
const validate = require('../../middlewares/validate');
const {minioController} = require('../../controllers');
const {minioValidation} = require('../../validations');
const multer = require('multer');
const { minioService } = require('../../services');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', validate(minioValidation.getBuckets), minioController.getBuckets)
router.post('/upload', upload.single('file'), minioController.putObject)

minioService.createBucket()
module.exports = router