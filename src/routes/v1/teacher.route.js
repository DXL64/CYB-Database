const express = require('express');
const auth = require('../../middlewares/auth');
const multer = require('multer');
const validate = require('../../middlewares/validate');
const { teacherController } = require('../../controllers');
const { teacherValidation } = require('../../validations');

const upload = multer({ dest: './uploads/' });

const router = express.Router();

router.get(
  '/',
  [auth('getTeachers'), validate(teacherValidation.getTeachers)],
  teacherController.getList
);
router.get(
  '/:teacherId',
  [auth('getTeacher'), validate(teacherValidation.getTeacher)],
  teacherController.getModel
);
router.delete(
  '/:teacherId',
  [auth('deleteTeacher'), validate(teacherValidation.getTeacher)],
  teacherController.deleteModel
);
router.post(
  '/',
  [auth('createTeacher'), upload.single('file'), validate(teacherValidation.createTeacher)],
  teacherController.createModel
);
router.post(
  '/noimg',
  [auth('createTeacherNoIMG'), validate(teacherValidation.createTeacher)],
  teacherController.createTeacherNoIMG
);
router.put(
  '/:teacherId',
  [auth('updateTeacher'), upload.single('file'), validate(teacherValidation.updateTeacher)],
  teacherController.updateModel
);
router.post(
  '/bulk',
  [auth('bulkCreateTeachers'), upload.single('file')],
  teacherController.bulk
);

module.exports = router;
