const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const secondarySchemas = require('../secondary-schemas');
const ContactSchema = secondarySchemas.ContactSchema;
const ReviewSchema = secondarySchemas.ReviewSchema;
const GallerySchema = secondarySchemas.GallerySchema;
const CourseSchema = secondarySchemas.CourseSchema;

const TuitionSchema = new Schema({
    name: String,
    location: String,
    timing: String,
    team: String,
    contact: [ContactSchema],
    facilities: String,
    coverPic: String,
    gallery: [GallerySchema],
    bragging: String,
    courses: [CourseSchema],
    reviews: [ReviewSchema],
    views: Number,
    bookmarks: Number
});

const Tuition = mongoose.model('tuition', TuitionSchema);

module.exports = Tuition;