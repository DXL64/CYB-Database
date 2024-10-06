const fs = require('fs');
const defu = require('defu');
const httpStatus = require('http-status');
const minioService = require('./minio.service');
const ApiError = require('../utils/ApiError');
const Teacher = require('../models/teacher.model');

const createTeacher = async (teacherBody) => {
  const imgSrc = `teachers/${teacherBody.file.filename}.jpg`;
  const filePath = teacherBody.file.path;
  const fileStream = fs.createReadStream(filePath);
  const fileStat = fs.statSync(filePath);
  await minioService.putObject(imgSrc, fileStream, fileStat.size);
  const newTeacher = {
    ...teacherBody,
    imgSrc,
  };
  return Teacher.create(newTeacher);
};

const createTeacherNoIMG = async (teacherBody) => {
  const newTeacher = {
    ...teacherBody,
  };
  return Teacher.create(newTeacher);
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
  const teacher = await Teacher.findById(id);
  if (!teacher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  if (updateBody.file) {
    const imgSrc = `teachers/${updateBody.file.filename}.jpg`;
    const filePath = updateBody.file.path;
    const fileStream = fs.createReadStream(filePath);
    const fileStat = fs.statSync(filePath);

    await minioService.putObject(imgSrc, fileStream, fileStat.size);

    // eslint-disable-next-line no-param-reassign
    updateBody.imgSrc = imgSrc;
  }
  // Kết hợp updateBody với thông tin của student
  const updatedData = defu(updateBody, teacher.toObject());
  // console.log(updatedData);
  Object.assign(teacher, updatedData); // Gán lại giá trị cho student
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
  createTeacherNoIMG,
  queryTeachers,
  getTeacherById,
  updateTeacherById,
  deleteTeacherById,
};
