const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const SolutionSchema = new Schema({
    board: String,
    class: String,
    subject: String,
    chapter: String,
    img_pdfPath: String
});

const Solution = mongoose.model('solution', SolutionSchema);

module.exports = Solution;