const httpStatus = require('http-status');
const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const defu = require('defu');
const { Wallpaper } = require('../models');
const ApiError = require('../utils/ApiError');
const minioService = require('./minio.service');

const prefix = `wallpaper`

const createWallpaper = async (wallpaperBody) => {
    const imgSrc = `${prefix}/${wallpaperBody.file.filename}.jpg`;
    const filePath = wallpaperBody.file.path;
    const fileStream = fs.createReadStream(filePath);
    const fileStat = fs.statSync(filePath);
    await minioService.putObject(imgSrc, fileStream, fileStat.size);
    const newWallpaper = {
        ...wallpaperBody,
        imgSrc,
    };
    return Wallpaper.create(newWallpaper);
};

const updateWallpaperById = async (id, updateBody) => {
    const wallpaper = await Wallpaper.findById(id);
    if (!wallpaper) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Wallpaper not found');
    }

    // Kiểm tra nếu updateBody.file tồn tại
    if (updateBody.file) {
        const imgSrc = `${prefix}/${updateBody.file.filename}.jpg`;
        const filePath = updateBody.file.path;
        const fileStream = fs.createReadStream(filePath);
        const fileStat = fs.statSync(filePath);

        await minioService.putObject(imgSrc, fileStream, fileStat.size);

        // eslint-disable-next-line no-param-reassign
        updateBody.imgSrc = imgSrc;
    }

    // Kết hợp updateBody với thông tin của wallpaper
    const updatedData = defu(updateBody, wallpaper.toObject());
    Object.assign(wallpaper, updatedData); // Gán lại giá trị cho wallpaper
    await wallpaper.save();
    return wallpaper;
};

const queryWallpapers = async (filter, options) => {
    const wallpaper = await Wallpaper.paginate(filter, options);
    return wallpaper;
};

const getWallpaperById = async (id) => {
    const wallpaper = await Wallpaper.findById(id);
    return wallpaper;
};

const deleteWallpaperById = async (wallpaperId) => {
    const wallpaper = await getWallpaperById(wallpaperId);
    if (!wallpaper) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Wallpaper not found');
    }
    await wallpaper.remove();
    return wallpaper;
};

module.exports = {
    createWallpaper,
    queryWallpapers,
    getWallpaperById,
    updateWallpaperById,
    deleteWallpaperById,
};
