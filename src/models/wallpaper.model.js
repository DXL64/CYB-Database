const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')
const { required, boolean } = require('joi')
const { trim } = require('validator')

const wallpaperSchema = mongoose.Schema({
    imgSrc: {
        type: String,
        required: true,
        trim: true,
    },
    post_id: {
        type: String,
        required: false,
        trim: true,
    },
    active: {
        type: Boolean,
        required: false,
        trim: true,
    }
})

wallpaperSchema.plugin(toJSON)
wallpaperSchema.plugin(paginate)



const Wallpaper = mongoose.model('Wallpaper', wallpaperSchema)

module.exports = Wallpaper;