const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { string, required } = require('joi');


const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        imgSrc: {
            type: String,
            required: false,
            trim: true,
        },
        content: {
            type: String,
            require: true,
            trim: true,
        },
        category: {
            type: String,
            require: false,
            trim: true
        },
    },
    {
        timestamps: true,
    }
)

postSchema.plugin(toJSON)
postSchema.plugin(paginate)

const Post = mongoose.model('Post', postSchema)

module.exports = Post