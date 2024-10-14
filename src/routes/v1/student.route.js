const express = require('express');
const auth = require('../../middlewares/auth');
const multer = require('multer');
const validate = require('../../middlewares/validate');
const { studentController } = require('../../controllers');
const { studentValidation } = require('../../validations');

const upload = multer({ dest: './uploads/' });

const router = express.Router();


router.route('/')
  .get([auth('getStudents'), validate(studentValidation.getStudents)], studentController.getStudents)
  .post([auth('createStudent'), upload.single('file'), validate(studentValidation.createStudent)], studentController.createStudent);

router.route('/:studentId')
  .get([auth('getStudent'), validate(studentValidation.getStudent)], studentController.getStudent)
  .put([auth('updateStudent'), upload.single('file'), validate(studentValidation.updateStudent)], studentController.updateStudent)
  .delete(auth('deleteStudent'), [validate(studentValidation.getStudent)], studentController.deleteStudent)
module.exports = router;