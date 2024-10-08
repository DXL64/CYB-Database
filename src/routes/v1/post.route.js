const express = require('express');
const multer = require('multer');
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

router.get('/', validate(postValidation.getModels), postController.getList);
router.get('/:postId', validate(postValidation.getModel), postController.get);
router.delete('/:postId', validate(postValidation.deleteModel), postController.deleteModel);
router.post(
    '/',
    [
        upload.fields([
            { name: 'file', maxCount: 1 }, // File đầu tiên
        ]),
        validate(postValidation.createModel)
    ],
    postController.create
);
router.put(
  '/:postId',
  [upload.single('file'), validate(postValidation.updateModel)],
  postController.update
);
// router.post('/bulk', upload.single('file'), teacherController.bulk)
module.exports = router;
