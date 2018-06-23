const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const secondarySchemas = require('../secondary-schemas');
const ContactSchema = secondarySchemas.ContactSchema;
const ReviewSchema = secondarySchemas.ReviewSchema;
const ImportantDateSchema = secondarySchemas.ImportantDateSchema;
const FacilitiesAndBraggingSchema = secondarySchemas.FacilitiesAndBraggingSchema;
const TimeAndDateSchema = secondarySchemas.TimeAndDateSchema;

const SchoolSchema = new Schema({
    coverPic: String,
    gallery: [String],
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
    contactPerson: String,
    primaryNumber: Number,
    alternateNumber: Number,
    email: String,
    website: String,
    fbLink: String,
    twitter: String,
    youtubeLink: String,
    instaLink: String,
    category: String,
    updated: { type: Date, default: Date.now },
});

const School = mongoose.model('school', SchoolSchema);

module.exports = School;