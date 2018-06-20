const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const secondarySchemas = require('../secondary-schemas');
const ContactSchema = secondarySchemas.ContactSchema;
const ReviewSchema = secondarySchemas.ReviewSchema;
const GallerySchema = secondarySchemas.GallerySchema;
const CourseSchema = secondarySchemas.CourseSchema;
const TeamSchema = secondarySchemas.TeamSchema;
const FacilitiesAndBraggingSchema = secondarySchemas.FacilitiesAndBraggingSchema;
const TimeAndDateSchema = secondarySchemas.TimeAndDateSchema;

const TuitionSchema = new Schema({
    name: String,
    category: String,
    fromAge: Number,
    toAge: Number,
    addressLine1: String,
    addressLine2: String,
    city: String,
    district: String,
    state: String,
    country: String,
    pin: Number,
    dayAndTimeOfOperation: [TimeAndDateSchema],
    team: [TeamSchema],
    description: String,
    contactPerson: String,
    primaryNumber: Number,
    secondaryNumber: Number,
    email: String,
    website: String,
    fbLink: String,
    twitterLink: String,
    youtubeLink: String,
    instaLink: String,
    facilities: String,   // image name discription array  // drop down
    img_coverPic: String,
    gallery: [GallerySchema],
    bragging: [FacilitiesAndBraggingSchema],
    courses: [CourseSchema],
    reviews: [ReviewSchema],
    views: Number,
    bookmarks: Number,
    signedBy: String
});

const Tuition = mongoose.model('tuition', TuitionSchema);

module.exports = Tuition;