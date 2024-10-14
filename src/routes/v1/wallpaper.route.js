const express = require('express');
const auth = require('../../middlewares/auth');
const multer = require('multer');
const validate = require('../../middlewares/validate');
const { wallpaperController } = require('../../controllers');
const { wallpaperValidation } = require('../../validations');

const upload = multer({ dest: './uploads/' });

const router = express.Router();

router.get(
  '/',
  [auth('getWallpapers'), validate(wallpaperValidation.getListWallpaper)],
  wallpaperController.getWallpapers
);
router.get(
  '/:wallpaperId',
  [auth('getWallpaper'), validate(wallpaperValidation.getWallpaper)],
  wallpaperController.getWallpaper
);
router.post(
  '/',
  [auth('createWallpaper'), upload.single('file'), validate(wallpaperValidation.createWallpaper)],
  wallpaperController.createWallpaper
);
router.put(
  '/:wallpaperId',
  [auth('updateWallpaper'), upload.single('file'), validate(wallpaperValidation.updateWallpaper)],
  wallpaperController.updateWallpaper
);
router.delete(
  '/:wallpaperId',
  [auth('deleteWallpaper'), validate(wallpaperValidation.deleteWallpaper)],
  wallpaperController.deleteWallpaper
);

module.exports = router;
