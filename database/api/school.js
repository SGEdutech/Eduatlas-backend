const route = require('express').Router();
const School = require('../modles/school');
const escapeRegex = require('../../scripts/escape-regex');
const DbAPIClass = require('../api-functions');
const schoolDbFunctions = new DbAPIClass(School);

route.get('/all', (req, res) => {
    const skip = (req.query.page - 1) * req.query.items;
    const limit = parseInt(req.query.items);
    schoolDbFunctions.getAllData(req.query.demands, skip, limit)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.get('/search', (req, res) => {
    const regex = new RegExp(escapeRegex(req.query.search), 'i');
    schoolDbFunctions.getMultipleData({name: regex}, 'name').then(data => res.send(data));
});

route.get('/', (req, res) => {
    schoolDbFunctions.getSpecificData(req.query, true).then(data => res.send(data)).catch(err => console.error(err));
});

route.post('/add/:arrayName/:_id', (req, res) => {
    let elementToBePushed;
    req.body.string ? elementToBePushed = req.body.string : elementToBePushed = req.body;
    schoolDbFunctions.addElementToArray({_id: req.params._id}, req.params.arrayName, elementToBePushed)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.post('/', (req, res) => {
    schoolDbFunctions.addCollection(req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.put('/update/:idOfCollection/:arrayName/:idOfNestedObject', (req, res) => {
    schoolDbFunctions.updateElementInArray({_id: req.params.idOfCollection}, req.params.arrayName,
        req.params.idOfNestedObject, req.body).then(data => res.send(data)).catch(err => console.error(err));
});


route.put('/:_id', (req, res) => {
    schoolDbFunctions.updateOneRow(req.params, req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.delete('/delete/:_id/:arrayName', (req, res) => {
    schoolDbFunctions.deleteElementFromArray({_id: req.params._id}, req.params.arrayName, req.body)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.delete('/empty/:keyname', (req, res) => {
    schoolDbFunctions.emptyKey(req.body, req.params.keyname).then(data => res.send(data)).catch(err => console.error(err));
});

route.delete('/:_id', (req, res) => {
    schoolDbFunctions.deleteOneRow(req.params).then(data => res.send(data)).catch(err => console.error(err));
});

module.exports = route;