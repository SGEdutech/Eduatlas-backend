const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const secondarySchemas = require('../secondary-schemas');
const ContactSchema = secondarySchemas.ContactSchema;
const ReviewSchema = secondarySchemas.ReviewSchema;
const ImportantDateSchema = secondarySchemas.ImportantDateSchema;
const GallerySchema = secondarySchemas.GallerySchema;
const FacilitiesAndBraggingSchema = secondarySchemas.FacilitiesAndBraggingSchema;
const TimeAndDateSchema = secondarySchemas.TimeAndDateSchema;

const object = {
    coverPic: String,
    gallery: [GallerySchema],
    bragging: [FacilitiesAndBraggingSchema],
    description: String,
    curriculum: String,
    fromGrade: String,
    toGrade: String,
    type: String,
    principalName: String,
    yearFounded: Number,
    dayAndTimeOfOperation: [TimeAndDateSchema],
    name: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    district: String,
    state: String,
    country: String,
    pin: Number,
    facilities: String,
    activities: String,
    reviews: [ReviewSchema],
    fee: Number,
    admissionProcess: String,
    startTime: Date,
    endTime: Date,
    importantDates: [ImportantDateSchema],
    views: Number,
    bookmarks: Number,
    claimedBy: String,
    contactNumber1: Number,
    contactNumber2: Number,
    contactNumber3: Number,
    email: String,
    website: String,
    fbLink: String,
    twitter: String,
    youtubeLink: String,
    instaLink: String,
    category: String,
    updated: { type: Date, default: Date.now },
};

const SchoolSchema = new Schema();

const School = mongoose.model('school', SchoolSchema);

module.exports = School;