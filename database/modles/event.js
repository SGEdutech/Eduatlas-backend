const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const secondarySchemas = require('../secondary-schemas');
const GallerySchema = secondarySchemas.GallerySchema;
const DurationSchema = secondarySchemas.DurationSchema;


const eventSchema = new Schema({
    owner: String,
    views: Number,
    bookmarks: Number,
    going: Number,
    notGoing: Number,
    mayBeGoing: Number,
    name: String,
    targetAge: String,
    lastDate: Date,
    description: String,
    location: String,
    timing: String,
    gallery: [GallerySchema],
    duration: [DurationSchema],
    coverPic: String
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;