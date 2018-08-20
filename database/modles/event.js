const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const secondarySchemas = require('../secondary-schemas');
const GallerySchema = secondarySchemas.GallerySchema;

const eventSchema = new Schema({
	name: String,
	category: String,
	description: String,
	fromAge: Number,
	toAge: Number,
	organiserName: String,
	organiserPhone: String,
	organiserEmail: String,
	lastDateRegistration: Date,
	website: String,
	fromDate: Date,
	toDate: Date,
	fromTime: String,
	toTime: String,
	addressLine1: String,
	addressLine2: String,
	city: String,
	district: String,
	state: String,
	country: String,
	pin: Number,
	gallery: [GallerySchema],
	img_eventCoverPic: String,
	going: { Number, default: 0 },
	notGoing: { Number, default: 0 },
	mayBeGoing: { Number, default: 0 },
	views: { type: Number, default: 0 },
	hits: { type: Number, default: 0 },
	goingUsers: [String],
	bookmarks: Number,
	signedBy: String,
	claimedBy: String
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;
