const route = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const config = require('./_config').ids;
const User = require('../database/modles/user');
const DatabaseAPIClass = require('../database/api-functions');
const APIHelperFunctions = new DatabaseAPIClass(User);

passport.serializeUser(function (user, done) {
    done(null, user.userId)
});

passport.deserializeUser(function (userid, done) {
    APIHelperFunctions.getSpecificData('userId', userid).then(user => {
        if (!user) {
            return done(new Error("no such user"))
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
        callbackURL: config.google.callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
        // passport callback function
        let profileInfo = {};
        profileInfo.googleId = profile.id;
        profileInfo.userName = profile.displayName;
        profileInfo.profilePic = profile.photos ? profile.photos[0].value : 'no pic uploaded';
        if (profile.emails) {
            profileInfo.email = profile.emails[0].value;
        }
        profileInfo.about = profile._json.tagline;
        console.log("************************");
        APIHelperFunctions.getSpecificData('googleId', profileInfo.googleId)
            .then(currentUser => {
                if (currentUser) {
                    done(null, currentUser);
                } else {
                    APIHelperFunctions.addRow(profileInfo)
                        .then(newUser => {
                            done(null, newUser);
                        });
                }
            });

    }
));

route.get('/', passport.authenticate('google', {scope: config.google.scope}));
route.get('/redirect', passport.authenticate('google'),
    (req, res) => {
        res.redirect('/profile')
    });

exports = module.exports = {
    route
};