const express = require('express');
const validate = require('../../middlewares/validate');
const {studentController} = require('../../controllers');
const {studentValidation} = require('../../validations');

const router = express.Router();

router.get('/', validate(studentValidation.getStudents), studentController.getStudents);
router.get('/:studentId', validate(studentValidation.getStudent), studentController.getStudent);
router.post('/', validate(studentValidation.createStudent), studentController.createStudent);
router.put('/:studentId', validate(studentValidation.updateStudent), studentController.updateStudent);

module.exports = router;
