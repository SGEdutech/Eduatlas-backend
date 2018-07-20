const hash = (() => {
    const crypto = require('crypto');

    const getSHA256 = data => {
        return crypto.createHash('sha256').update(data).digest('hex');
    };

    return {getSHA256};

})();

function passwordHashMiddleware(req, res, next) {
    const salt = 'assassin';
    if (req.body && req.body.password) {
        req.body.password = hash.getSHA256(salt + req.body.password);
    }
    next();
}

exports = module.exports = passwordHashMiddleware;