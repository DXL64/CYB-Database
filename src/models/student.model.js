const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
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
    schoolYear: {
      type: String,
      trim: true,
    },
    major: {
      type: String,
      trim: true,
    },
    dob: {
      type: String,
      trim: true,
    },
    studySince: {
      type: String,
      trim: true,
    },
    studyUntil: {
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

studentSchema.plugin(toJSON);
studentSchema.plugin(paginate);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
