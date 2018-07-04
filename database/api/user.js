const route = require('express').Router();
const User = require('../modles/user');
const escapeRegex = require('../../scripts/escape-regex');
const DbAPIClass = require('../api-functions');
const userDbFunctions = new DbAPIClass(User);

/*// hiding user

route.get('/', (req, res) => {
    if(req.user){
        res.send(req.user);
    }else{
        res.send('LogIn')
    }
});

// hiding user*/

route.get('/all', (req, res) => {
    const skip = (req.query.page - 1) * req.query.items;
    const limit = parseInt(req.query.items);
    userDbFunctions.getAllData(req.query.demands, skip, limit)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.get('/', (req, res) => {
    userDbFunctions.getSpecificData(req.query).then(data => {
        const done = sendSlicedArrIfRequested(req, res, data);
        if (done === false) res.send(data);
    }).catch(err => console.error(err));
});

route.post('/', (req, res) => {
    userDbFunctions.addCollection(req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.post('/add/:arrayName/:_id', (req, res) => {
    userDbFunctions.addElementToArray({_id: req.params._id}, req.params.arrayName, req.body)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.put('/update/:idOfCollection/:arrayName/:idOfNestedObject', (req, res) => {
    userDbFunctions.updateElementInArray({_id: req.params.idOfCollection}, req.params.arrayName,
        req.params.idOfNestedObject, req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.put('/:_id', (req, res) => {
    userDbFunctions.updateOneRow(req.params, req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.delete('/delete/:arrayName/:_id', (req, res) => {
    userDbFunctions.deleteElementFromArray({_id: req.params._id}, req.params.arrayName, req.body)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.delete('/:_id', (req, res) => {
    userDbFunctions.deleteOneRow(req.params).then(data => res.send(data)).catch(err => console.error(err));
});

module.exports = route;