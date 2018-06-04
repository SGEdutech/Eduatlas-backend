const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId: String,
    password: String,
    blogsOwned: [String],
    eventsOwned: [String],
    tuitionsOwned: [String],
    schoolsOwned: [String],
    isStudent: Boolean,
    isMale: Boolean,
    address: String,
    name: String,
    email: String,
    phone: Number,
    profilePicPath: String,
    dateOfBirth: Date,
    goingEvents: [String],
    mayBeGoingEvents: [String],
    schoolStuding: String,
    tuitionStuding: String,
    bookmarks: [String]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;