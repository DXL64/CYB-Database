const fs = require('fs');
const defu = require('defu');
const httpStatus = require('http-status');
const minioService = require('./minio.service');
const ApiError = require('../utils/ApiError');
const Teacher = require('../models/teacher.model');
const csv = require('csv-parser');
const path = require('path');

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
  const updatedData = defu(updateBody, teacher.toObject());
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

const bulkUpload = (file) => {
  // return file.path
  return new Promise((resolve, reject) => {
    let results = [];

    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (data) => {
        // Lưu từng dòng CSV vào mảng results
        results.push(data);
      })
      .on('end', () => {
        // Xóa file tạm sau khi đọc xong
        fs.unlinkSync(file.path);
        results = results.map(item => {
          item.gender = item.gender === 'Nam' ? 'male' : 'female';
          if (item.dob) {
            const [day, month, year] = item.dob.split('/');
            item.dob = `${year}-${month}-${day}`; // Định dạng thành 'yyyy-mm-dd'
          }
          return item;
        });
        Teacher.insertMany(results)
        
        // Resolve và trả về kết quả dưới dạng JSON
        resolve(results);
      })
      .on('error', (err) => {
        // Xóa file nếu gặp lỗi
        fs.unlinkSync(file.path);

        // Reject promise với lỗi
        reject('Error reading the CSV file');
      });
  });
}

module.exports = {
  createTeacher,
  createTeacherNoIMG,
  queryTeachers,
  getTeacherById,
  updateTeacherById,
  deleteTeacherById,
  bulkUpload
};
