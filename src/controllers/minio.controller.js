const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const fs = require('fs');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { minioService } = require('../services');

export const upload = catchAsync(async (req, res) => {
    if (!req.file) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: 'Files: [file] is required' });
    }
    const src = `uploads/${req.file.filename}.jpg`
    const path = req.file.path
    const stream = fs.createReadStream(path)
    const stat = fs.statSync(path);
    const info = await minioService.putObject(src, stream, stat.size);
    res.status(httpStatus.CREATED).send(info);
})