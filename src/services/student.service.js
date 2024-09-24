const httpStatus = require('http-status');
const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const defu = require('defu');
const { Student } = require('../models');
const ApiError = require('../utils/ApiError');
const minioService = require('./minio.service');

const createStudent = async (studentBody) => {
  const imgSrc = `students/${studentBody.file.filename}.jpg`;
  const filePath = studentBody.file.path;
  const fileStream = fs.createReadStream(filePath);
  const fileStat = fs.statSync(filePath);
  await minioService.putObject(imgSrc, fileStream, fileStat.size);
  const newStudent = {
    ...studentBody,
    imgSrc,
  };
  return Student.create(newStudent);
};

const updateStudentById = async (id, updateBody) => {
  const student = await Student.findById(id);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  // Kiểm tra nếu updateBody.file tồn tại
  if (updateBody.file) {
    const imgSrc = `students/${updateBody.file.filename}.jpg`;
    const filePath = updateBody.file.path;
    const fileStream = fs.createReadStream(filePath);
    const fileStat = fs.statSync(filePath);

    await minioService.putObject(imgSrc, fileStream, fileStat.size);

    // eslint-disable-next-line no-param-reassign
    updateBody.imgSrc = imgSrc;
  }

  // Kết hợp updateBody với thông tin của student
  const updatedData = defu(updateBody, student.toObject());
  Object.assign(student, updatedData); // Gán lại giá trị cho student
  await student.save();
  return student;
};

const queryStudents = async (filter, options) => {
  const students = await Student.paginate(filter, options);
  return students;
};

const getStudentById = async (id) => {
  const student = await Student.findById(id);
  return student;
};

const deleteStudentById = async (studentId) => {
  const student = await getStudentById(studentId);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  await student.remove();
  return student;
};

module.exports = {
  createStudent,
  queryStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
