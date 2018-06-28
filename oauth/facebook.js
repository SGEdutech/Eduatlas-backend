const route = require('express').Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const config = require('./_config').ids;
const User = require('../database/modles/user');
const DatabaseAPIClass = require('../database/api-functions');
const APIHelperFunctions = new DatabaseAPIClass(User);


passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(function (userid, done) {
    //reimplement it using FindById function of mongoose
    APIHelperFunctions.getSpecificData('_id', userid)
        .then((user) => {
            if (!user) {
                done(new Error("no such user"))
            }
            done(null, user)
        })
        .catch((err) => {
            done(err)
        })
});

passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
        // passport callback function
        let profileInfo = {};
        profileInfo.facebookId = profile.id;
        profileInfo.name = profile.displayName;
        profileInfo.profilePicPath = profile.photos ? profile.photos[0].value : 'no pic uploaded';
        if (profile.emails !== undefined) {
            profileInfo.primaryEmail = profile.emails[0].value;
        }
        // profileInfo.about = profile._json.tagline;
        APIHelperFunctions.getSpecificData('facebookId', profileInfo.facebookId)
            .then((currentUser) => {
                if (currentUser) {
                    // means we already have a account linked with google
                    // console.log('user already linked with facebook');
                    //send it to serialize phase
                    done(null, currentUser);
                } else {
                    // means we will now save this account
                    // console.log("creating new record");
                    //we haven't saved phoneNumber and password yet
                    APIHelperFunctions.addCollection(profileInfo)
                        .then((newUser) => {
                            /*console.log('newUser created is: ');
                            console.log(newUser);*/
                            //send it to serialize phase
                            done(null, newUser);
                        });
                }
            });

    }
));

route.get('/', passport.authenticate('facebook'));

route.get('/redirect', passport.authenticate('facebook', {scope: config.facebook.scope}),
    (req, res) => {
        // res.send(req.user);
        res.redirect('/profile')
    });

exports = module.exports = {
    route
};