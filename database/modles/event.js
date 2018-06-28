const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const secondarySchemas = require('../secondary-schemas');
const GallerySchema = secondarySchemas.GallerySchema;

const eventSchema = new Schema({
    name: String,
    description: String,
    organiserName: String,
    organiserPhone: String,
    organiserEmail: String,
    organiserAddress: String,
    website: String,
    targetAge: String,
    fromDate: Date,
    toDate: Date,
    fromTime: String,
    toTime: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    district: String,
    state: String,
    country: String,
    pin: Number,
    gallery: [GallerySchema],
    img_coverPic: String,
    going: Number,
    notGoing: Number,
    mayBeGoing: Number,
    views: Number,
    bookmarks: Number
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;