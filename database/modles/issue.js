const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
    name: String,
    contact: Number,
    email: String,
    description: String,
    type: String,
    id: String
});

const Issue = mongoose.model('issue', IssueSchema);

module.exports = Issue;