const express = require('express');
const helmet = require('helmet');
const path = require('path');
const PORT = require('./config').SERVER.PORT;
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const keys = require('../database-and-auth/oauth/_config').keys;
const {eventPicsMiddleware, schoolPicsMiddleware, tuitionPicsMiddleware, userCoverPicMiddleware, solutionPdfMiddleware} = require('./storage-engine');
const {nestingMiddleware} = require('./scripts/nesting');
const {passwordHashMiddleware} = require('./scripts/hash-password');
const redirectUnknownHostMiddleware = require('./scripts/redirect-unknown-host-middleware');
const sanitizeDemandsMiddleware = require('./scripts/sanatize-demands');
require('../database-and-auth/oauth/local');
require('../database-and-auth/oauth/google');
require('../database-and-auth/oauth/facebook');
require('../database-and-auth/database/connection');

const routes = {
	blog: require('../database-and-auth/database/api/blog'),
	event: require('../database-and-auth/database/api/event'),
	school: require('../database-and-auth/database/api/school'),
	tuition: require('../database-and-auth/database/api/tuition'),
	user: require('../database-and-auth/database/api/user'),
	issue: require('../database-and-auth/database/api/issue'),
	auth: require('../database-and-auth/oauth/auth_routes'),
	forgot: require('../database-and-auth/oauth/forgot'),
	solution: require('../database-and-auth/database/api/solution')
};

const app = express();

app.use(cors());

app.use(redirectUnknownHostMiddleware);

app.use(session({
	secret: keys.CookieKey,
	cookie: {
		maxAge: 7 * 24 * 60 * 60 * 1000
	},
	maxAge: Date.now() + (7 * 86400 * 1000)
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(helmet());

//temp routes
app.use('/add/tuition', (req, res) => res.redirect('/add-tuition.html'));
app.use('/add/school', (req, res) => res.redirect('/add-school.html'));
app.use('/admin/tuition', (req, res) => res.redirect('/Admin-tuition.html'));
app.use('/add/notes', (req, res) => res.redirect('/solution.html'));

app.use('/event', eventPicsMiddleware);
app.use('/school', schoolPicsMiddleware);
app.use('/tuition', tuitionPicsMiddleware);
app.use('/user', userCoverPicMiddleware);
app.use('/slept-through-class', solutionPdfMiddleware);

app.get('/*', sanitizeDemandsMiddleware);

app.use(nestingMiddleware, passwordHashMiddleware);

app.use((req, res, next) => {
	next();
});

app.use('/blog', routes.blog);
app.use('/event', routes.event);
app.use('/school', routes.school);
app.use('/tuition', routes.tuition);
app.use('/issue', routes.issue);
app.use('/user', routes.user);
app.use('/auth', routes.auth);
app.use('/forgot', routes.forgot);
app.use('/slept-through-classs', routes.solution);

app.get('/*', (req, res) => res.status(404).sendFile(path.join(__dirname, 'public', 'error-page.html')));

app.listen(PORT, () => console.log(`Yo dawg! Server's at http://localhost:${PORT}`));
