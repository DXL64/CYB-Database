const express = require('express');
const multer = require('multer');
const validate = require('../../middlewares/validate');
const { postController } = require('../../controllers');
const { postValidation } = require('../../validations');

const upload = multer({ dest: './uploads/' });
const router = express.Router();

router.get('/', validate(postValidation.getModels), postController.getList);
router.get('/:postId', validate(postValidation.getModel), postController.get);
router.delete('/:postId', validate(postValidation.deleteModel), postController.deleteModel);
router.post('/', [upload.single('file'), validate(postValidation.createModel)], postController.create);
router.put(
  '/:postId',
  [upload.single('file'), validate(postValidation.updateModel)],
  postController.update
);
// router.post('/bulk', upload.single('file'), teacherController.bulk)
module.exports = router;
