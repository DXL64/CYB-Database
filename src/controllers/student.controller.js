const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');
const fs = require('fs');
const path = require('path');
const catchAsync = require('../utils/catchAsync');
const { studentService } = require('../services');
const { minioService } = require('../services')

const createStudent = catchAsync(async (req, res) => {
  if (!req.file) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'File is required' });
  }
  const imgSrc = `students/${req.file.filename}.jpg`;
  const filePath = req.file.path;
  const fileStream = fs.createReadStream(filePath);
  const fileStat = fs.statSync(filePath);
  await minioService.putObject(imgSrc, fileStream, fileStat.size);
  req.body.imgSrc = imgSrc;
  const student = await studentService.createStudent(req.body);
  res.status(httpStatus.CREATED).send(student);
});

const getStudents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'major', 'schoolYear']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await studentService.queryStudents(filter, options);
  res.send(result);
});

const getStudent = catchAsync(async (req, res) => {
  const student = await studentService.getStudentById(req.params.studentId);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  res.send(student);
});

const updateStudent = catchAsync(async (req, res) => {
  const student = await studentService.updateStudentById(req.params.studentId, req.body);
  res.send(student);
});

const deleteStudent = catchAsync(async (req, res) => {
  await studentService.deleteStudentById(req.params.studentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
