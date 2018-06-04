const mongoose = require('mongoose');
const School = require('./modles/school');

mongoose.connect('mongodb://localhost/altasbase');

mongoose.connection.once('open', () => console.log('DB\'s connected niggas!!!'));

let school = new School({
    name: 'Ashish'
});

school.save()
    .then(() => School.findOneAndUpdate({name: 'Ashish'}, {name: 'Batman'}))
    .then(data => console.log(data));
