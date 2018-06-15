const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: Editor
const BlogSchema = new Schema({
    blogId: String,
    owner: String,  //no owner
    views: Number,
    bookmarks: Number,
    title: String,
    dateUploaded: Date,
    authorName: String,
    authorInfo: String,
    authorFacebookLink: String,
    authorTwitterLink: String,
    authorQuoraLink: String,   // connect with user
    body: String   //TODO: Figure out a markup for decoration
});

//catagory

const Blog = mongoose.model('blog', BlogSchema);

module.exports = Blog;