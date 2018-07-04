const route = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../database/modles/user');
const DatabaseAPIClass = require('../database/api-functions');
const APIHelperFunctions = new DatabaseAPIClass(User);

passport.serializeUser((user, done) => {
    //userid will be stuffed in cookie
    done(null, user)
});

passport.deserializeUser((user, done) => {
    //reimplement it using FindById function of mongoose
    APIHelperFunctions.getSpecificData({'_id': user._id})
        .then((user) => {
            if (!user) {
                done(new Error("no such user"))
            }
            done(null, user)
        }).catch((err) => {
        done(err)
    })
});

passport.use(new LocalStrategy((username, password, done) => {

    APIHelperFunctions.getSpecificData({'primaryEmail': username})
        .then(user => {
            if (!user) {
                done(new Error('No such user'))
            } else {
                if (user.password !== password) {
                    done(new Error('Wrong password'))
                } else {
                    console.log("successful local login");
                }
            }

            // save extra information to ease API checks
            let newObj = {
                _id: user._id,
                blogsOwned:user.blogsOwned,
                tuitionsOwned:user.tuitionsOwned,
                schoolsOwned:user.schoolsOwned,
                eventsOwned:user.eventsOwned,
            };
            //below line will pass user to serialize user phase
            done(null, newObj)
        })
        .catch(err => {
            done(err)
        })
}));

route.get('/login', (req, res) => {
    if (req.user) {
        res.send("already logged in");
    }
});

route.post('/login', passport.authenticate('local', {
    failureRedirect: '/app/login-page.html',
    successRedirect: '/app/User-dashboard.html',
}));

// post request to sign-up don't need passportJS
route.post('/signup', (req, res) => {
    APIHelperFunctions.getSpecificData({primaryEmail: req.body.primaryEmail}) // regex to check if _id is valid mongo id- /^[0-9a-fA-F]{24}$/
        .then(currentUser => {

            if (currentUser) {
                res.send("email already linked with a account")
                // disable sign-up button till username is unique
                // create AJAX request(refresh button) from frontend to check for username uniqueness
            } else {

                APIHelperFunctions.addCollection(req.body)
                    .then(createdUser => {
                        res.redirect('/app/User-dashboard.html')
                    });
            }
        })
        .catch(err => console.error(err));

});

exports = module.exports = {
    route
};