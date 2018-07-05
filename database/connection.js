const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/atlasbase')
    .then(() => console.log('DB\'s connected niggas!!!'))
    .catch(err => console.error(err));