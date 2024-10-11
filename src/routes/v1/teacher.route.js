const express = require('express');
const multer = require('multer');
const validate = require('../../middlewares/validate');
const { teacherController } = require('../../controllers');
const { teacherValidation } = require('../../validations');

const upload = multer({ dest: './uploads/' });

const router = express.Router();

router.get('/', validate(teacherValidation.getTeachers), teacherController.getModel);
router.get('/:teacherId', validate(teacherValidation.getTeacher), teacherController.getModel);
router.delete('/:teacherId', validate(teacherValidation.getTeacher), teacherController.deleteModel);
router.post('/', [upload.single('file'), validate(teacherValidation.createTeacher)], teacherController.createModel);
router.post('/noimg', validate(teacherValidation.createTeacher), teacherController.createTeacherNoIMG);
router.put(
  '/:teacherId',
  [upload.single('file'), validate(teacherValidation.updateTeacher)],
  teacherController.updateTeacher
);
router.post('/bulk', upload.single('file'), teacherController.bulk)
module.exports = router;
