const express = require('express');
const multer = require('multer');
const validate = require('../../middlewares/validate');
const { studentController } = require('../../controllers');
const { studentValidation } = require('../../validations');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/', validate(studentValidation.getStudents), studentController.getStudents);
router.get('/:studentId', validate(studentValidation.getStudent), studentController.getStudent);
router.post('/', [upload.single('file'), validate(studentValidation.createStudent)], studentController.createStudent);
router.put(
  '/:studentId',
  [upload.single('file'), validate(studentValidation.updateStudent)],
  studentController.updateStudent
);

module.exports = router;
