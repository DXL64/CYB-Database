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
        auth('user'),
        upload.fields([{ name: 'file', maxCount: 1 }]),
        validate(postValidation.createModel),
        postController.create
    )
    .get(
        auth('user'),
        validate(postValidation.getModels),
        postController.getList
    );

router
    .route('/:postId')
    .get(
        auth('user'),  // Xác thực quyền "getPost"
        validate(postValidation.getModel),  // Xác thực dữ liệu đầu vào
        postController.get  // Gọi controller để xử lý
    )
    .put(
        auth('user'),  // Xác thực quyền "updatePost"
        upload.single('file'),  // Đăng tải file
        validate(postValidation.updateModel),  // Xác thực dữ liệu đầu vào
        postController.update  // Gọi controller để xử lý
    )
    .delete(
        auth('user'),  // Xác thực quyền "deletePost"
        validate(postValidation.deleteModel),  // Xác thực dữ liệu đầu vào
        postController.deleteModel  // Gọi controller để xử lý
    );

module.exports = router;
