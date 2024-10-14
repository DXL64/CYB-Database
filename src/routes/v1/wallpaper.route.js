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
  [auth('user'), validate(wallpaperValidation.getListWallpaper)],
  wallpaperController.getWallpapers
);
router.get(
  '/:wallpaperId',
  [auth('user'), validate(wallpaperValidation.getWallpaper)],
  wallpaperController.getWallpaper
);
router.post(
  '/',
  [auth('user'), upload.single('file'), validate(wallpaperValidation.createWallpaper)],
  wallpaperController.createWallpaper
);
router.put(
  '/:wallpaperId',
  [auth('user'), upload.single('file'), validate(wallpaperValidation.updateWallpaper)],
  wallpaperController.updateWallpaper
);
router.delete(
  '/:wallpaperId',
  [auth('user'), validate(wallpaperValidation.deleteWallpaper)],
  wallpaperController.deleteWallpaper
);

module.exports = router;
