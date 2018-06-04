const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    owner: String,
    views: Number,
    bookmarks: Number,
    title: String,
    dateUploaded: Date,
    authorName: String,
    authorInfo: String,
    authorFacebookLink: String,
    authorTwitterLink: String,
    authorQuoraLink: String,
    body: String   //TODO: Figure out a markup for decoration
});

const Blog = mongoose.model('blog', BlogSchema);

module.exports = Blog;