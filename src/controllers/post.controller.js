const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { postService } = require('../services');

const create = catchAsync(async (req, res) => {
  if (!req.files) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'Files: [file] is required' });
  }
  req.body.file = req.files.file[0];
  const post = await postService.createModel(req.body);
  res.status(httpStatus.CREATED).send(post);
});

const update = catchAsync(async (req, res) => {
  if (req.file) {
    req.body.file = req.file;
  }
  const post = await postService.updateModelById(req.params.postId, req.body);
  res.send(post);
});

const getList = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'major', 'schoolYear']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await postService.queryModels(filter, options);
  res.send(result);
});

const get = catchAsync(async (req, res) => {
  const model = await postService.getModelById(req.params.postId);
  if (!model) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  res.send(model);
});

const deleteModel = catchAsync(async (req, res) => {
  await postService.deleteModelById(req.params.postId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  create,
  getList,
  get,
  update,
  deleteModel,
};
