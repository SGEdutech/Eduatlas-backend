const mongoose = require('mongoose');
const School = require('./modles/school');
const APIHelperClass = require('./api-functions');
const databaseFunctions = new APIHelperClass(School);
const uri = require('../config').MONGO.URI;
mongoose.connect(uri);

mongoose.connection.once('open', () => console.log('DB\'s connected niggas!!!'));