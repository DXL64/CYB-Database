const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { wallpaperService } = require('../services');

const createWallpaper = catchAsync(async (req, res) => {
  if (!req.file) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'File is required' });
  }
  req.body.file = req.file;
  const wallpaper = await wallpaperService.createWallpaper(req.body);
  res.status(httpStatus.CREATED).send(wallpaper);
});

const updateWallpaper = catchAsync(async (req, res) => {
  if (req.file) {
    req.body.file = req.file;
  }
  const wallpaper = await wallpaperService.updateWallpaperById(req.params.wallpaperId, req.body);
  res.send(wallpaper);
});

const getWallpapers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'major', 'schoolYear']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await wallpaperService.queryWallpapers(filter, options);
  res.send(result);
});

const getWallpaper = catchAsync(async (req, res) => {
  const wallpaper = await wallpaperService.getWallpaperById(req.params.wallpaperId);
  if (!wallpaper) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallpaper not found');
  }
  res.send(wallpaper);
});

const deleteWallpaper = catchAsync(async (req, res) => {
  await wallpaperService.deleteWallpaperById(req.params.wallpaperId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createWallpaper,
  getWallpapers,
  getWallpaper,
  updateWallpaper,
  deleteWallpaper,
};
