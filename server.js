const express = require('express');
const path = require('path');
const cors = require('cors');
const PORT = require('./config').SERVER.PORT;
const storageEngion = require('./storage-engine');
require('./database/connection');
const winston = require('winston');

const routes = {
    blog: require('./database/api/blog'),
    event: require('./database/api/event'),
    school: require('./database/api/school'),
    tuition: require('./database/api/tuition'),
    user: require('./database/api/user')
};

//by default logger exit on error, if you want to change it, add a key:value while creating logger
//{ exitOnError: true }
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'combined.log'})
    ]
});


logger.on('error', function (err) {
    console.log(err)
});

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/blog', routes.blog);
app.use('/event', storageEngion.eventCoverPicMiddleware, filterEmptyReqObjects, routes.event);
app.use('/school', storageEngion.schoolCoverPicMiddleware, filterEmptyReqObjects, routes.school);
app.use('/tuition', storageEngion.tuitionCoverPicMiddleware, filterEmptyReqObjects, routes.tuition);
app.use('/user', routes.user);

app.listen(PORT, () => {
    console.log(`Yo dawg! Server's at http://localhost:${PORT}`);
});

function filterEmptyReqObjects(req, res, next) {
    Object.keys(req.body).forEach(element => {
        if (req.body[element] === '') {
            delete req.body[element];
        }
    });
    next();
}