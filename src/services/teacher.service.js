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
  return new Promise((resolve, reject) => {
    let results = [];

    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (data) => {
        // Lưu từng dòng CSV vào mảng results
        results.push(data);
      })
      .on('end', async () => {
        // Chuyển đổi giá trị gender từ 'Nam' thành 'male' và các giá trị khác thành 'female'
        results = results.map(item => {
          item.gender = item.gender === 'Nam' ? 'male' : 'female';

          if (item.dob) {
            const [day, month, year] = item.dob.split('/');
            item.dob = `${year}`;
          }

          // Chuyển đổi giá trị active từ chuỗi sang boolean
          if (typeof item.active === 'string') {
            item.active = item.active.toUpperCase() === 'TRUE'; // Chuyển đổi "TRUE" hoặc "FALSE" thành true hoặc false
          }
          item.position = !item.position ? "Giáo viên" : item.position
          if(!item.position) {
            item.position = "Giáo viên"
          }

          return item;
        });

        // Xóa file tạm sau khi đọc xong
        fs.unlinkSync(file.path);

        // Chèn từng tài liệu vào collection Teacher và bỏ qua tài liệu không hợp lệ
        const insertResults = [];
        for (const teacher of results) {
          try {
            const insertedDoc = await Teacher.create(teacher);
            insertResults.push(insertedDoc);
          } catch (error) {
            console.log(`Skipping invalid teacher data: ${JSON.stringify(teacher)}, Error: ${error.message}`);
          }
        }

        // Resolve với kết quả là các tài liệu hợp lệ vừa được chèn vào
        resolve(insertResults);
      })
      .on('error', (err) => {
        // Xóa file nếu gặp lỗi
        fs.unlinkSync(file.path);

        // Reject promise với lỗi
        reject('Error reading the CSV file');
      });
  });
};


module.exports = {
  createTeacher,
  createTeacherNoIMG,
  queryTeachers,
  getTeacherById,
  updateTeacherById,
  deleteTeacherById,
  bulkUpload
};
