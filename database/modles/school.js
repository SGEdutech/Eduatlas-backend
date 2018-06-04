const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const secondarySchemas = require('../secondary-schemas');
const ContactSchema = secondarySchemas.ContactSchema;
const ReviewSchema = secondarySchemas.ReviewSchema;
const ImportantDateSchema = secondarySchemas.ImportantDateSchema;
const GallerySchema = secondarySchemas.GallerySchema;

const SchoolSchema = new Schema({
    coverPic: String,
    gallery: String,
    bragging: String,
    description: String,
    curriculum: String,
    grades: String,
    type: String,
    boss: String,
    yearFounded: Number,
    timing: String,
    contact: [ContactSchema],
    name: String,
    location: String,
    facilities: String,
    activities: String,
    reviews: [ReviewSchema],
    fee: Number,
    admissionProcess: String,
    importantDates: [ImportantDateSchema],
    views: Number,
    bookmarks: Number,
    claimedBy: String
});

const School = mongoose.model('school', SchoolSchema);

module.exports = School;