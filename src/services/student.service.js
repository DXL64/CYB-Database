const httpStatus = require('http-status');
const { Student } = require('../models');
const ApiError = require('../utils/ApiError');

const createStudent = async (studentBody) => {
  // if (await Student.isEmailTaken(studentBody.email)) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  return Student.create(studentBody);
};

const queryStudents = async (filter, options) => {
  const students = await Student.paginate(filter, options);
  return students;
};

const getStudentById = async (id) => {
  const student = await Student.findById(id);
  return student;
};

const updateStudentById = async (id, updateBody) => {
  const student = await Student.findById(id);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  Object.assign(student, updateBody);
  await student.save();
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
