const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const secondarySchemas = require('../secondary-schemas');
const ContactSchema = secondarySchemas.ContactSchema;
const ReviewSchema = secondarySchemas.ReviewSchema;
const ImportantDateSchema = secondarySchemas.ImportantDateSchema;
const GallerySchema = secondarySchemas.GallerySchema;
const FacilitiesAndBraggingSchema = secondarySchemas.FacilitiesAndBraggingSchema;

const SchoolSchema = new Schema({
    coverPic: String,
    gallery: [String], //array
    bragging: [FacilitiesAndBraggingSchema],  //make a schema
    description: String,
    curriculum: String,  //dropdown- CBSE, ICSE, State board, IB, IGCSC
    fromGrade: String,  //prenurcery - 12 drop down
    toGrade: String,
    type: String,  // see that pic  // day , day boarding boarding
    principalName: String,
    yearFounded: Number,
    fromTime: String,  //date and time
    toTime: String,
    fromDay: String,
    toDay: String,
    name: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    district: String,
    state: String,
    country: String,
    pin: Number,
    facilities: String, // image and title
    activities: String,
    reviews: [ReviewSchema],
    fee: Number,
    admissionProcess: String,  // fee details see the photo
    startTime: Date,
    endTime: Date,
    importantDates: [ImportantDateSchema],  //3 info see pic
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
    catagoty: String,  // pre/play school, day care, formal school
    updated: { type: Date, default: Date.now },
});
//website social fb twitter youtube insta

const School = mongoose.model('school', SchoolSchema);

module.exports = School;