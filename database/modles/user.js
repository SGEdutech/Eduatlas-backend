const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    password: String,
    blogsOwned: [String],
    eventsOwned: [String],
    tuitionsOwned: [String],
    schoolsOwned: [String],
    isMale: Boolean,
    address: String,  //you knwo the drill
    name: String,
    email: String,  //should be unique also alternate
    phone: Number,
    profilePicPath: String,
    dateOfBirth: Date,
    goingEvents: [String],
    mayBeGoingEvents: [String],
    schoolStuding: String,  //history
    bookmarks: [String]
});
//privacy

const User = mongoose.model('user', UserSchema);

module.exports = User;