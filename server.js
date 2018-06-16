const express = require('express');
const path = require('path');
const PORT = require('./config').SERVER.PORT;
const storageEngion = require('./storage-engine');
const session = require('express-session');
const passport = require('passport');
require('./oauth/local');
require('./oauth/google');
require('./oauth/facebook');
const keys = require('./oauth/_config').keys;
require('./database/connection');

const routes = {
    blog: require('./database/api/blog'),
    event: require('./database/api/event'),
    school: require('./database/api/school'),
    tuition: require('./database/api/tuition'),
    user: require('./database/api/user'),
    auth: require('./oauth/auth_routes')
};

const app = express();

//cookie stuff
app.use(session({
    secret: keys.CookieKey,
    cookie: {maxAge: 7 * 24 * 60 * 60 * 1000}
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', routes.auth);
app.use('/blog', routes.blog);
app.use('/event', storageEngion.eventCoverPicMiddleware, routes.event);
app.use('/school', storageEngion.schoolCoverPicMiddleware, routes.school);
app.use('/tuition', storageEngion.tuitionCoverPicMiddleware, routes.tuition);
app.use('/user', routes.user);

app.listen(PORT, () => {
    console.log(`Yo dawg! Server's at http://localhost:${PORT}`);
});