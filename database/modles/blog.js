const mongoose = require('mongoose');
const arrayUniquePlugin = require('mongoose-unique-array');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
	blogId: String,
	owner: String, //no owner
	views: { type: Number, default: 0 },
	hits: { type: Number, default: 0 },
	bookmarks: Number,
	title: String,
	authorName: String,
	authorInfo: String,
	authorFacebookLink: String,
	authorTwitterLink: String,
	authorQuoraLink: String, // connect with user
	body: String,
	category: String,
	dateUploaded: { type: Date, default: Date.now() }
});

BlogSchema.plugin(arrayUniquePlugin);

const Blog = mongoose.model('blog', BlogSchema);

module.exports = Blog;
