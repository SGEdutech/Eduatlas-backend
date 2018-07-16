const mongoose = require('mongoose');
const uri = require('../config').MONGO.URI;

mongoose.connect(uri)
    .then(() => console.log('DB\'s Connected'))
    .catch(err => console.error(err));


const Tuition = require('./modles/tuition');