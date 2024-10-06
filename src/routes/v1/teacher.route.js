const express = require('express');
const multer = require('multer');
const validate = require('../../middlewares/validate');
const { teacherController } = require('../../controllers');
const { teacherValidation } = require('../../validations');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/', validate(teacherValidation.getTeachers), teacherController.getTeachers);
router.get('/:teacherId', validate(teacherValidation.getTeacher), teacherController.getTeacher);
router.delete('/:teacherId', validate(teacherValidation.getTeacher), teacherController.deleteTeacher);
router.post('/', [upload.single('file'), validate(teacherValidation.createTeacher)], teacherController.createTeacher);
router.post('/noimg', validate(teacherValidation.createTeacher), teacherController.createTeacherNoIMG);
router.put(
  '/:teacherId',
  [upload.single('file'), validate(teacherValidation.updateTeacher)],
  teacherController.updateTeacher
);

module.exports = router;
