const route = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const config = require('./_config').ids;
const User = require('../database/modles/user');
const DatabaseAPIClass = require('../database/api-functions');
const APIHelperFunctions = new DatabaseAPIClass(User);


passport.serializeUser(function (user, done) {
    //userid will be stuffed in cookie
    done(null, user)
});

passport.deserializeUser(function (user, done) {
    //reimplement it using FindById function of mongoose
    APIHelperFunctions.getSpecificData('_id', user._id).then(user => {
        if (!user) {
            return done(new Error("no such user"))
        } else {
            console.log("user logged in with google id")
        }
        done(null, user)
    })
        .catch(err => {
            done(err)
        })
});

passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        //below is the path where google consent screen will redirect user to
        //same redirect address must be saved in console.developer.google in order to work
        callbackURL: config.google.callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
        // passport callback function
        //passport returns here with user info
        let profileInfo = {};
        profileInfo.googleId = profile.id;
        profileInfo.name = profile.displayName;
        profileInfo.profilePicPath = profile.photos ? profile.photos[0].value : 'no pic uploaded';
        if (profile.emails) {
            profileInfo.primaryEmail = profile.emails[0].value;
        }
        profileInfo.about = profile._json.tagline;

        /*console.log("*******");
        console.log(profileInfo);
        console.log("*******");*/

        APIHelperFunctions.getSpecificData({'googleId': profileInfo.googleId})
            .then(currentUser => {
                if (currentUser) {

                    // save extra information to ease API checks
                    let newObj = {
                        _id: currentUser._id,
                        blogsOwned: currentUser.blogsOwned,
                        tuitionsOwned: currentUser.tuitionsOwned,
                        schoolsOwned: currentUser.schoolsOwned,
                        eventsOwned: currentUser.eventsOwned,
                    };
                    //below line will pass user to serialize user phase
                    done(null, newObj);
                } else {
                    APIHelperFunctions.addCollection(profileInfo)
                        .then(newUser => {
                            let newObj = {
                                _id: newUser._id,
                                blogsOwned: newUser.blogsOwned,
                                tuitionsOwned: newUser.tuitionsOwned,
                                schoolsOwned: newUser.schoolsOwned,
                                eventsOwned: newUser.eventsOwned,
                            };
                            //below line will pass user to serialize user phase
                            done(null, newObj);
                        });
                }
            });

    }
));

route.get('/', passport.authenticate('google', {scope: config.google.scope}));

//callback route for google to redirect user
//here google will send a code(in uri) which we will use to get user info
route.get('/redirect', passport.authenticate('google'),
    (req, res) => {
        res.redirect('/app/User-dashboard.html')
    });

exports = module.exports = {
    route
};