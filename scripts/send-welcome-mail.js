const sendMail = require('./sendMail');

const subject = 'Welcome To Eduatlas';

const content = `
    <h2>Need education? We got you covered!</h2>
    <p>Let's make education great again</p>
`;

function sendWelcomeMail(recipient) {
    sendMail(recipient, subject, content);
}

module.exports = sendWelcomeMail;