const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Teacher = require('../models/teacher.model');

const createTeacher = async (teacherBody) => {
  return Teacher.create(teacherBody);
};

const queryTeachers = async (filter, options) => {
  const teachers = await Teacher.paginate(filter, options);
  return teachers;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<Teacher>}
 */
const getTeacherById = async (id) => {
  const teacher = await Teacher.findById(id);
  return teacher;
};

const updateTeacherById = async (id, updateBody) => {
  const teacher = await getTeacherById(id);
  if (!teacher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  Object.assign(teacher, updateBody);
  await teacher.save();
  return teacher;
};

const deleteTeacherById = async (userId) => {
  const teacher = await getTeacherById(userId);
  if (!teacher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await teacher.remove();
  return teacher;
};

module.exports = {
  createTeacher,
  queryTeachers,
  getTeacherById,
  updateTeacherById,
  deleteTeacherById,
};
