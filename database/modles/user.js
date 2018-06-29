const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    password: String,
    blogsOwned: [String],
    eventsOwned: [String],
    tuitionsOwned: [String],
    schoolsOwned: [String],
    primaryRole: String, // Institute, student, parent
    isMale: Boolean,
    addressLine1: String,
    addressLine2: String,
    city: String,
    district: String,
    state: String,
    country: String,
    pin: Number,
    firstName: String,
    middleName: String,
    lastName: String,
    primaryEmail: String,  //should be unique also alternate
    secondaryEmail: String,
    phone: Number,
    img_userProfilePic: String,
    dateOfBirth: Date,
    goingEvents: [String],
    mayBeGoingEvents: [String],
    schoolStuding: String,  //history
    fbLink: String,
    twitterLink: String,
    youtubeLink: String,
    instaLink: String,
    linkedinLink: String,
    bookmarks: [String]
});
// Privacy

const User = mongoose.model('user', UserSchema);

module.exports = User;