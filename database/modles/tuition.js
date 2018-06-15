const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const secondarySchemas = require('../secondary-schemas');
const ContactSchema = secondarySchemas.ContactSchema;
const ReviewSchema = secondarySchemas.ReviewSchema;
const GallerySchema = secondarySchemas.GallerySchema;
const CourseSchema = secondarySchemas.CourseSchema;

const TuitionSchema = new Schema({
    name: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    district: String,
    state: String,
    country: String,
    pin: Number,
    fromTime: String,
    toTime: String,
    fromDay: String,
    toDay: String,
    team: [String],  //Make schema
    description: String,
    contactNumber1: Number,
    contactNumber2: Number,
    contactNumber3: Number,
    email: String,
    website: String,
    fbLink: String,
    twitter: String,
    youtubeLink: String,
    instaLink: String,
    facilities: String,   // image name discription array  // drop down
    coverPic: String,
    gallery: [GallerySchema],
    bragging: [String],   // mutiple
    courses: [CourseSchema],
    reviews: [ReviewSchema],
    views: Number,
    bookmarks: Number
});

const Tuition = mongoose.model('tuition', TuitionSchema);

module.exports = Tuition;