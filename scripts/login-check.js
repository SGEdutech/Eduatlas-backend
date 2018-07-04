function login_check(req, res, next) {
    if (!req.user) {
        res.send("please login first")
    } else {
        let idToBeChecked = req.query._id || req.params._id || req.params.idOfCollection;
        if (idToBeChecked == req.user._id) {
            next();
        } else {
            res.send('illegal operation')
        }
        res.send('no id found in query')
    }
}


module.exports = login_check;