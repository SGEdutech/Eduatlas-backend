const mongoose = require('mongoose');
const School = require('./modles/school');
const APIHelperClass = require('./api-functions');
const databaseFunctions = new APIHelperClass(School);

mongoose.connect('mongodb://localhost/altasbase');

mongoose.connection.once('open', () => console.log('DB\'s connected niggas!!!'));