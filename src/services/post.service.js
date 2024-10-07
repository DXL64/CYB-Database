const httpStatus = require('http-status');
const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const defu = require('defu');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');
const minioService = require('./minio.service');
const { minio } = require('../config/config');

const createModel = async (body) => {
    const imgSrc = `posts/${body.file.filename}.jpg`;
    const filePath = body.file.path;
    const fileStream = fs.createReadStream(filePath);
    const fileStat = fs.statSync(filePath);

    const contentSrc = `posts/_contents/${body.content.filename}.html`;
    const contentPath = body.content.path;
    const contentStream = fs.createReadStream(contentPath);
    const contentStat = fs.statSync(contentPath);

    // Tạo các promise cho hai tác vụ
    const uploadImgPromise = minioService.putObject(imgSrc, fileStream, fileStat.size);
    const uploadContentPromise = minioService.putObject(contentSrc, contentStream, contentStat.size);

    // Chờ cho cả hai tác vụ hoàn thành
    await Promise.all([uploadImgPromise, uploadContentPromise]);

    const newModel = {
        ...body,
        imgSrc,
        content: contentSrc,
    };

    return Post.create(newModel);
};

const updateModelById = async (id, updateBody) => {
    const model = await Post.findById(id);
    if (!model) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Model not found');
    }

    if (updateBody.file) {
        const imgSrc = `posts/${updateBody.file.filename}.jpg`;
        const filePath = updateBody.file.path;
        const fileStream = fs.createReadStream(filePath);
        const fileStat = fs.statSync(filePath);

        await minioService.putObject(imgSrc, fileStream, fileStat.size);

        // eslint-disable-next-line no-param-reassign
        updateBody.imgSrc = imgSrc;
    }

    const updatedData = defu(updateBody, model.toObject());
    Object.assign(model, updatedData);
    await model.save();
    return model;
};

const queryModels = async (filter, options) => {
    const posts = await Post.paginate(filter, options);
    return posts;
};

const getModelById = async (id) => {
    const posts = await Post.findById(id);
    return posts;
};

const deleteModelById = async (id) => {
    const post = await getModelById(id);
    if (!post) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
    }
    await post.remove();
    return post;
};

module.exports = {
    createModel,
    queryModels,
    getModelById,
    updateModelById,
    deleteModelById,
};

