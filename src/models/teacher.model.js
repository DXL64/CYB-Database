const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const teacherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (value && !validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    phone: {
      type: String,
      trim: true,
    },
    imgSrc: {
      type: String,
      trim: true,
    },
    position: {
      type: String,
      trim: true,
    },
    major: {
      type: String,
      trim: true,
    },
    dob: {
      type: String,
    },
    workSince: {
      type: String,
      trim: true,
    },
    workUntil: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    status: {
      type: String,
      enum: ['working', 'retired', 'transfer', 'passed_away'],
      required: true,
    },
    priority: {
      type: Number,
      trim: true,
    },
    achievements: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json and pagination
teacherSchema.plugin(toJSON);
teacherSchema.plugin(paginate);

/**
 * @typedef Teacher
 */
const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
