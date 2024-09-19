const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { minioService } = require('../services');
const fs = require('fs');
const config = require('../config/config');

const getBuckets = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'major', 'position']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await minioService.listBucket();
  console.log(result)
  res.send(result);
});

const putObject = catchAsync(async (req, res) => {
  const file = fs.readFileSync(req.file.path, )
  await minioService.putObject(`${req.body.prefix}/${req.file.filename}.jpg`,file)
  res.json({
    message: 'File upload successfully',
    path: `${config.minio.bucket_name}/${req.body.prefix}/${req.file.filename}.jpg`
  })
})

module.exports = {
  getBuckets,
  putObject
}