function redirectUnknownHostMiddleware(req, res, next) {
    // localhost is for dev purpose
    if (/eduatlas.com$/.test(req.get('host')) === false && req.get('host').startsWith('localhost') === false) {
        res.status(301).redirect('https://eduatlas.com');
        return;
    }
    next();
}

module.exports = redirectUnknownHostMiddleware;