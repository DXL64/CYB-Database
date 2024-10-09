const Joi = require('joi')

const getListWallpaper = {
    query: Joi.object().keys({
        active: Joi.boolean().optional()
    })
}

const createWallpaper = {
    body: Joi.object().keys({
        active: Joi.boolean().default(false),
        post_id: Joi.boolean().default(''),
        imgSrc: Joi.boolean().default('')
    })
}

const updateWallpaper = {
    params: Joi.object().keys({
        wallpaperId: Joi.string().required()
    }),
    body: Joi.object().keys({
        active: Joi.boolean().default(false),
        post_id: Joi.boolean().default(''),
        imgSrc: Joi.boolean().default('')
    })
}

const getWallpaper = {
    params: Joi.object().keys({
        wallpaperId: Joi.string().required()
    })
}

const deleteWallpaper = {
    params: Joi.object().keys({
        wallpaperId: Joi.string().required()
    })
}

module.exports = {
    getListWallpaper,
    getWallpaper,
    updateWallpaper,
    createWallpaper,
    deleteWallpaper
}