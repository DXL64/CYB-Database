const express = require('express');
const validate = require('../../middlewares/validate');
const {minioController} = require('../../controllers');
const {minioValidation} = require('../../validations');
const multer = require('multer')

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', validate(minioValidation.getBuckets), minioController.getBuckets)
router.post('/upload', upload.single('file'), (req, res) => {
    res.json({
        message: 'File upload successfully',
        file: req.file,
        body: req.body
    })
})

module.exports = router