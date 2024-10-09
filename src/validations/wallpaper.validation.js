const Joi = require('joi')

const getListWallpaper = {
    query: Joi.object().keys({
        active: Joi.string().optional(),
        page: Joi.number().integer().optional(),
        limit: Joi.number().integer().optional(),
    })
}

const createWallpaper = {
    body: Joi.object().keys({
        active: Joi.string().default(false),
        post_id: Joi.string().default(''),
        imgSrc: Joi.string().default('')
    })
}

const updateWallpaper = {
    params: Joi.object().keys({
        wallpaperId: Joi.string().required()
    }),
    body: Joi.object().keys({
        active: Joi.string().default(false),
        post_id: Joi.string().default(''),
        imgSrc: Joi.string().default('')
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