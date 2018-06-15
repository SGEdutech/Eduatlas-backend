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
    title: String,
    path: String
});

const CourseSchema = new Schema({
    title: String,
    duration: String,
    fee: Number,
    startDate: Date
});

const FacilitiesAndBraggingSchema = new Schema({
    title: String,
    image: String
});

exports = module.exports = {
    ContactSchema,
    ImportantDateSchema,
    ReviewSchema,
    GallerySchema,
    CourseSchema,
    FacilitiesAndBraggingSchema
};