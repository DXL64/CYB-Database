const express = require('express');
const multer = require('multer');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { postController } = require('../../controllers');
const { postValidation } = require('../../validations');

const upload = multer({
    dest: './uploads/',
    limits: {
        fieldSize: 5 * 1024 * 1024, // Giới hạn dung lượng file là 5MB
    },
});

const router = express.Router();

router
    .route('/')
    .post(
        // auth('user'),
        upload.fields([{ name: 'file', maxCount: 1 }]),
        validate(postValidation.createModel),
        postController.create
    )
    .get(
        // auth('user'),
        validate(postValidation.getModels),
        postController.getList
    );

router
    .route('/:postId')
    .get(
        // auth('user'), 
        validate(postValidation.getModel),
        postController.get
    )
    .put(
        // auth('user'),
        upload.single('file'),
        validate(postValidation.updateModel),
        postController.update
    )
    .delete(
        // auth('user'),
        validate(postValidation.deleteModel),
        postController.deleteModel
    );

module.exports = router;
