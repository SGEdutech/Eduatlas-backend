const mongoose = require('mongoose');
const uri = require('../config').MONGO.URI;

mongoose.connect(uri)
    .then(() => {
        console.log('DB\'s Connected');
        cleanUp();
    })
    .catch(err => console.error(err));


const Tuition = require('./modles/tuition')

function cleanUp() {
    console.log('Running cleanup');
    Tuition.find()
        .then(data => {
        data.forEach(item => {
            if (item.dayAndTimeOfOperation && item.dayAndTimeOfOperation.length !== 0 && item.dayAndTimeOfOperation[0].day === undefined) {
                item.dayAndTimeOfOperation = [];
                item.save();
            }
        });
            console.log('Cleanup completed');
    })
        .catch(err => console.error(err));
}