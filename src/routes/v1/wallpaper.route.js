const express = require('express');
const multer = require('multer');
const validate = require('../../middlewares/validate');
const { wallpaperController } = require('../../controllers');
const { wallpaperValidation } = require('../../validations');

const upload = multer({ dest: './uploads/' });

const router = express.Router();

router.get('/', validate(wallpaperValidation.getListWallpaper), wallpaperController.getWallpapers);
router.get('/:wallpaperId', validate(wallpaperValidation.getWallpaper), wallpaperController.getWallpaper);
router.post('/', [upload.single('file'), validate(wallpaperValidation.createWallpaper)], wallpaperController.createWallpaper);
router.put(
  '/:wallpaperId',
  [upload.single('file'), validate(wallpaperValidation.updateWallpaper)],
  wallpaperController.updateWallpaper
);

module.exports = router;
