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
const {eventCoverPicMiddleware, schoolCoverPicMiddleware, tuitionCoverPicMiddleware, userCoverPicMiddleware} =
    require('./storage-engine');
const {nestingMiddleware} = require('./scripts/nesting');
require('./database/connection');
const sanitizeDemandsMiddleware = require('./scripts/sanatize-demands');
const winston = require('winston');

const routes = {
    blog: require('./database/api/blog'),
    event: require('./database/api/event'),
    school: require('./database/api/school'),
    tuition: require('./database/api/tuition'),
    user: require('./database/api/user'),
    issue: require('./database/api/issue'),
    auth: require('./oauth/auth_routes')
};

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

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//cookie stuff
app.use(session({
    secret: keys.CookieKey,
    cookie: {maxAge: 7 * 24 * 60 * 60 * 1000},
    maxAge: Date.now() + (7 * 86400 * 1000)
}));
app.use(passport.initialize());
app.use(passport.session());

//temp routes
app.use('/add/tuition', (req, res) => res.redirect('/add-tuition.html'));
app.use('/add/school', (req, res) => res.redirect('/add-school.html'));
app.use('/admin/tuition', (req, res) => res.redirect('/Admin-tuition.html'));

app.use(cors());

app.use('/event', eventCoverPicMiddleware);
app.use('/school', schoolCoverPicMiddleware);
app.use('/tuition', tuitionCoverPicMiddleware);
app.use('/user', userCoverPicMiddleware);

app.get('/*', sanitizeDemandsMiddleware);

app.use(nestingMiddleware);

app.use('/blog', routes.blog);
app.use('/event', routes.event);
app.use('/school', routes.school);
app.use('/tuition', routes.tuition);
app.use('/issue', routes.issue);
app.use('/user', routes.user);
app.use('/auth', routes.auth);

app.listen(PORT, () => console.log(`Yo dawg! Server's at http://localhost:${PORT}`));