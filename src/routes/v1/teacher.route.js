const express = require('express')
const validate = require('../../middlewares/validate');
const teacherController = require('./../../controllers/teacher.controller')
const teacherValidation = require('./../../validations/teacher.validation')

const router = express.Router()
router.get('/', validate(teacherValidation.getTeachers), teacherController.getTeachers)
router.get('/:teacherId', validate(teacherValidation.getTeacher), teacherController.getTeacher)
router.post('/', validate(teacherValidation.createTeacher), teacherController.createTeacher)
router.put('/:teacherId', validate(teacherValidation.updateTeacher), teacherController.updateTeacher)

module.exports = router