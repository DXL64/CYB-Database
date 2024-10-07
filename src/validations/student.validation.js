const Joi = require('joi');

const getStudents = {
  query: Joi.object().keys({
    name: Joi.string().optional(),
    page: Joi.number().integer().optional(),
    limit: Joi.number().integer().optional(),
  }),
};

const createStudent = {
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    email: Joi.string().email().trim().lowercase(),
    phone: Joi.string().trim(),
    schoolYear: Joi.string().trim(),
    major: Joi.string().trim(),
    dob: Joi.string().trim(),
    studySince: Joi.string().trim(),
    studyUntil: Joi.string().trim(),
    gender: Joi.string().valid('male', 'female').required(),
    active: Joi.boolean(),
    achievements: Joi.string().trim(),
  }),
};

const getStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().required(),
  }),
};

const updateStudent = {
  body: Joi.object().keys({
    name: Joi.string().trim(),
    email: Joi.string().email().trim().lowercase(),
    phone: Joi.string().trim(),
    imgSrc: Joi.string().trim(),
    schoolYear: Joi.string().trim(),
    major: Joi.string().trim(),
    dob: Joi.string().trim(),
    studySince: Joi.string().trim(),
    studyUntil: Joi.string().trim(),
    gender: Joi.string().valid('male', 'female'),
    active: Joi.boolean(),
    achievements: Joi.string().trim(),
  }),
};

module.exports = {
  getStudents,
  createStudent,
  getStudent,
  updateStudent,
};