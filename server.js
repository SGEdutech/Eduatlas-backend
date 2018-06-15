const express = require('express');
const path = require('path');
const PORT = require('./config').SERVER.PORT;
const storageEngion = require('./storage-engine');
require('./database/connection');

const routes = {
    blog: require('./database/api/blog'),
    event: require('./database/api/event'),
    school: require('./database/api/school'),
    tuition: require('./database/api/tuition'),
    user: require('./database/api/user')
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/blog', routes.blog);
app.use('/event', storageEngion.eventCoverPicMiddleware, routes.event);
app.use('/school', storageEngion.schoolCoverPicMiddleware, routes.school);
app.use('/tuition', storageEngion.tuitionCoverPicMiddleware, routes.tuition);
app.use('/user', routes.user);

app.use((req, res, next) => {
    console.log(req.file);
    next();
});

app.listen(PORT, () => {
    console.log(`Yo dawg! Server's at http://localhost:${PORT}`);
});