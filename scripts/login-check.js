function youShallNotPass(req, res, next) {
    if (!req.user) {
        res.send("please login first")
    } else {
        let idToBeChecked = req.query._id || req.params._id || req.params.idOfCollection;
        if (idToBeChecked === undefined) res.send('Id not found');
        if (idToBeChecked === req.user._id) {
            next();
        } else {
            res.send('Not Authorised');
        }
    }
}


module.exports = youShallNotPass;