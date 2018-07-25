const route = require('express').Router();
const cache = require('memory-cache');
const uid = require('uid');
const sendMail = require('../scripts/send-mail');
const {hashPassword} = require('../scripts/hash-password');
const User = require('../database/modles/user');
const DbAPIClass = require('../database/api-functions');
const userDbFunctions = new DbAPIClass(User);

route.post('/new-password', (req, res) => {
    userDbFunctions.getSpecificData({primaryEmail: req.body.email})
        .then(user => {
            if (user === null) {
                res.send({done: false, message: 'We don\'t know this email'});
                return;
            }
            const token = generateAndCacheToken(req.user._id);
            sendMail(req.user.primaryEmail, 'Password Reset', getEmailContent(token));
            res.send({done: true});
        });
});

route.get('/password-reset/:token', (req, res) => {
    const email = cache.get(req.params.token);
    if (email === null) {
        res.send('Your password has either expired or never been requested');
    }
    res.redirect(`/new-password.html?${req.params.token}`);
});

route.get('/change-password', (req, res) => {
    const email = cache.get(req.body.token);
    if (email === null) {
        res.send({
            done: false,
            message: 'Seems like token has been expired./n Please try again'
        });
    }
    const hashedPassword = hashPassword(req.body.password)
    userDbFunctions.updateOneRow({primaryEmail: email}, {password: hashedPassword})
        .then(() => res.send({done: true}))
        .catch(() => res.send({done: false}));
});

function generateAndCacheToken(userId) {
    const token = uid();
    cache.put(token, 'userId', 3600000);
    return token;
}

function getEmailContent(token) {
    return `
        <p>You are recieving this because you (or someone else) have requested the reset of the password of your account</p>
        <p>Please click on the following link or paste it into your browser to complete the process</p>
        <a href="http://localhost:6868/forgot/new-password/${token}">http://localhost:6868/forgot/reset-password/${token}</a>
        <p>If you did not request this, please ignore this email and your password will remail unchanged</p>
    `;
}

module.export = route;