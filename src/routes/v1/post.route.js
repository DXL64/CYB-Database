const express = require('express');
const multer = require('multer');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { postController } = require('../../controllers');
const { postValidation } = require('../../validations');

const upload = multer({
    dest: './uploads/',
    limits: {
        fieldSize: 5 * 1024 * 1024
    }
});
const router = express.Router();

router.route('/')
    .get([auth("listPosts"), validate(postValidation.getModels)], postController.getList)
    .post(
        [
            auth("createPost"),
            upload.fields([
                { name: 'file', maxCount: 1 },
            ]),
            validate(postValidation.createModel)
        ],
        postController.create
    );

router.route('/:postId')
    .get(
        [auth("getPost"), validate(postValidation.getModel)],
        postController.get
    )
    .delete(
        [auth("delete"), validate(postValidation.deleteModel)],
        postController.deleteModel)
    .put(
        [auth("updatePost"), upload.single('file'), validate(postValidation.updateModel)],
        postController.update
    );

module.exports = router;
