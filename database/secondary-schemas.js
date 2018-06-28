const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: String,
    phone: Number,
    email: String
});

const ImportantDateSchema = new Schema({
    title: String,
    date: Date
});

const ReviewSchema = new Schema({
    likes: Number,
    rating: Number,
    owner: String
});

const GallerySchema = new Schema({
    img_path: String,
    album: String
});

const CourseSchema = new Schema({
    title: String,
    ageGroup: String,
    duration: String,
    fee: Number,
    nextBatch: Date
});

const FacilitiesAndBraggingSchema = new Schema({
    title: String,
    description: String,
    img_path: String
});

const TeamSchema = new Schema({
    name: String,
    description: String,
    qualification: String,
    img_path: String
});

const TimeAndDateSchema = new Schema({
    day: String,
    fromTime: String,
    toTime: String
});

exports = module.exports = {
    ContactSchema,
    ImportantDateSchema,
    ReviewSchema,
    GallerySchema,
    CourseSchema,
    FacilitiesAndBraggingSchema,
    TeamSchema,
    TimeAndDateSchema
};