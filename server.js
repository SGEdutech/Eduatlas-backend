const express = require('express');
const path = require('path');
const cors = require('cors');
const PORT = require('./config').SERVER.PORT;
const session = require('express-session');
const passport = require('passport');
require('./oauth/local');
require('./oauth/google');
require('./oauth/facebook');
const keys = require('./oauth/_config').keys;
const {eventCoverPicMiddleware, schoolCoverPicMiddleware, tuitionCoverPicMiddleware} =
    require('./storage-engine');
const {nestingMiddleware} = require('./scripts/nesting');
require('./database/connection');
const winston = require('winston');

const routes = {
    blog: require('./database/api/blog'),
    event: require('./database/api/event'),
    school: require('./database/api/school'),
    tuition: require('./database/api/tuition'),
    user: require('./database/api/user'),
    auth: require('./oauth/auth_routes')
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
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/app', express.static(path.join(__dirname, 'public')));

//cookie stuff
app.use(session({
    secret: keys.CookieKey,
    cookie: {maxAge: 7 * 24 * 60 * 60 * 1000},
}));
app.use(passport.initialize());
app.use(passport.session());

//temp routes
app.use('/add/tuition', (req, res) => res.redirect('/app/add-tuition.html'));
app.use('/add/school', (req, res) => res.redirect('/app/add-school.html'));
app.use('/admin/tuition', (req, res) => res.redirect('/app/Admin-tuition.html'))

app.use(cors());



app.use('/blog', nestingMiddleware, routes.blog);
app.use('/event', eventCoverPicMiddleware, nestingMiddleware, routes.event);
app.use('/school', schoolCoverPicMiddleware, nestingMiddleware, routes.school);
app.use('/tuition', tuitionCoverPicMiddleware, nestingMiddleware, routes.tuition);
app.use('/user', nestingMiddleware, routes.user);
app.use('/auth', routes.auth);

app.listen(PORT, () => {
    console.log(`Yo dawg! Server's at http://localhost:${PORT}`);
});