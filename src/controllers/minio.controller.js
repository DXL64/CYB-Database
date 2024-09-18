const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { minioService } = require('../services');

const getBuckets = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'major', 'position']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await minioService.listBucket();
  console.log(result)
  res.send(result);
});

module.exports = {
  getBuckets
}