const express = require('express');
const auth = require('../../middlewares/auth');
const multer = require('multer');
const validate = require('../../middlewares/validate');
const { studentController } = require('../../controllers');
const { studentValidation } = require('../../validations');

const upload = multer({ dest: './uploads/' });

const router = express.Router();


router.route('/')
  .get([auth('user'), validate(studentValidation.getStudents)], studentController.getStudents)
  .post([auth('user'), upload.single('file'), validate(studentValidation.createStudent)], studentController.createStudent);

router.route('/:studentId')
  .get([auth('user'), validate(studentValidation.getStudent)], studentController.getStudent)
  .put([auth('user'), upload.single('file'), validate(studentValidation.updateStudent)], studentController.updateStudent)
  .delete(auth('user'), [validate(studentValidation.getStudent)], studentController.deleteStudent)
module.exports = router;