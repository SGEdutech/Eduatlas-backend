const route = require('express').Router();
const User = require('../modles/user');
const escapeRegex = require('../../scripts/escape-regex');
const DbAPIClass = require('../api-functions');
const userDbFunctions = new DbAPIClass(User);
const youShallNotPass = require('../../scripts/login-check');

route.get('/check', (req, res) => {
    if (!req.user) {
        res.send('LogIn')
    } else {
        res.send(req.user)
    }
});

route.get('/all', (req, res) => {
    const skip = (req.query.page - 1) * req.query.items;
    const limit = parseInt(req.query.items);
    userDbFunctions.getAllData(req.query.demands, skip, limit)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.get('/', (req, res) => {
    if (youShallNotPass(req.user, req.query._id)) {
        userDbFunctions.getSpecificData(req.query).then(data => console.log(data));
    } else {
        res.send("youShallNotPass")
    }
});

route.post('/', (req, res) => {
    userDbFunctions.addCollection(req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.post('/add/:arrayName/:_id', (req, res) => {
    let elementToBePushed;
    req.body.string ? elementToBePushed = req.body.string : elementToBePushed = req.body;
    if (youShallNotPass(req.user, req.params._id)) {
        userDbFunctions.addElementToArray({_id: req.params._id}, req.params.arrayName, elementToBePushed)
            .then(data => res.send(data))
            .catch(err => console.error(err));
    } else {
        res.send("youShallNotPass")
    }
});

route.put('/update/:idOfCollection/:arrayName/:idOfNestedObject', (req, res) => {
    if (youShallNotPass(req.user, req.params.idOfCollection)) {
        userDbFunctions.updateElementInArray({_id: req.params.idOfCollection}, req.params.arrayName,
            req.params.idOfNestedObject, req.body).then(data => res.send(data)).catch(err => console.error(err));
    } else {
        res.send("youShallNotPass")
    }
});

route.put('/:_id', (req, res) => {
    if (youShallNotPass(req.user, req.params._id)) {
        userDbFunctions.updateOneRow(req.params, req.body).then(data => res.send(data)).catch(err => console.error(err));
    } else {
        res.send("youShallNotPass")
    }
});

route.delete('/delete/:arrayName/:_id', (req, res) => {
    if (youShallNotPass(req.user, req.params._id)) {
        userDbFunctions.deleteElementFromArray({_id: req.params._id}, req.params.arrayName, req.body)
            .then(data => res.send(data))
            .catch(err => console.error(err));
    } else {
        res.send("youShallNotPass")
    }
});

route.delete('/empty/:keyname', (req, res) => {
    userDbFunctions.emptyKey(req.body, req.params.keyname).then(data => res.send(data)).catch(err => console.error(err));
});

route.delete('/:_id', (req, res) => {
    if (youShallNotPass(req.user, req.params._id)) {
        userDbFunctions.deleteOneRow(req.params).then(data => res.send(data)).catch(err => console.error(err));
    } else {
        res.send("youShallNotPass")
    }
});

module.exports = route;