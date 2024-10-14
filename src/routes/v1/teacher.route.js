const express = require('express');
const auth = require('../../middlewares/auth');
const multer = require('multer');
const validate = require('../../middlewares/validate');
const { teacherController } = require('../../controllers');
const { teacherValidation } = require('../../validations');

const upload = multer({ dest: './uploads/' });

const router = express.Router();

router.route('/')
  .get(
    auth('user'),
    validate(teacherValidation.getTeachers),
    teacherController.getList
  ).post(
    [auth('user'), upload.single('file'), validate(teacherValidation.createTeacher)],
    teacherController.createModel
  )
router.post(
  '/noimg',
  [auth('user'), validate(teacherValidation.createTeacher)],
  teacherController.createTeacherNoIMG
);;

router.route('/:teacherId')
  .get(
    auth('user'),
    validate(teacherValidation.getTeacher),
    teacherController.getModel
  ).delete(
    auth('user'), validate(teacherValidation.getTeacher),
    teacherController.deleteModel
  ).put(
    auth('user'), upload.single('file'),
    validate(teacherValidation.updateTeacher),
    teacherController.updateModel
  )

router.post(
  '/bulk',
  auth('user'), upload.single('file'),
  teacherController.bulk
);

module.exports = router;
