const Joi = require('joi');

const getTeachers = {
  query: Joi.object().keys({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    position: Joi.string().optional(),
    major: Joi.string().optional(),
    dobFrom: Joi.date().optional(),
    dobTo: Joi.date().optional(),
    page: Joi.number().integer().optional(),
    limit: Joi.number().integer().optional(),
  }),
};

const createTeacher = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().optional(),
    imgSrc: Joi.string().optional(),
    position: Joi.string().optional(),
    major: Joi.string().optional(),
    dob: Joi.string().optional(),
    workSince: Joi.string().optional(),
    workUntil: Joi.string().optional(),
    gender: Joi.string().valid('male', 'female').required(),
    active: Joi.boolean(),
    status: Joi.string().valid('working', 'retired', 'transfer', 'passed_away').required(),
    priority: Joi.string().trim(),
    achievements: Joi.string().optional(),
  }),
};

const getTeacher = {
  params: Joi.object().keys({
    teacherId: Joi.string().required(),
  }),
};

const updateTeacher = {
  body: Joi.object().keys({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    imgSrc: Joi.string().optional(),
    position: Joi.string().optional(),
    major: Joi.string().optional(),
    dob: Joi.string().optional(),
    workSince: Joi.string().optional(),
    workUntil: Joi.string().optional(),
    gender: Joi.string().valid('male', 'female').optional(),
    active: Joi.boolean(),
    status: Joi.string().valid('working', 'retired', 'transfer', 'passed_away').required(),
    priority: Joi.string().trim(),
    achievements: Joi.string().optional(),
  }),
};

module.exports = {
  getTeachers,
  createTeacher,
  getTeacher,
  updateTeacher,
};
