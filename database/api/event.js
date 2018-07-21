const route = require('express').Router();
const Event = require('../modles/event');
const escapeRegex = require('../../scripts/escape-regex');
const DbAPIClass = require('../api-functions');
const eventDbFunctions = new DbAPIClass(Event);

route.get('/all', (req, res) => {
    const skip = (req.query.page - 1) * req.query.items;
    const limit = parseInt(req.query.items);
    eventDbFunctions.getAllData(req.query.demands, skip, limit)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.get('/search', (req, res) => {
    const regex = new RegExp(escapeRegex(req.query.search), 'i');
    eventDbFunctions.getMultipleData({name: regex}, 'name').then(data => res.send(data));
});

route.get('/', (req, res) => {
    eventDbFunctions.getSpecificData(req.query, true).then(data => res.send(data)).catch(err => console.error(err));
});

route.post('/add/:arrayName/:_id', (req, res) => {
    let elementToBePushed;
    req.body.string ? elementToBePushed = req.body.string : elementToBePushed = req.body;
    eventDbFunctions.addElementToArray({_id: req.params._id}, req.params.arrayName, elementToBePushed)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.post('/', (req, res) => {
    if (req.file) req.body.coverPic = req.file.filename;
    eventDbFunctions.addCollection(req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.put('/update/:idOfCollection/:arrayName/:idOfNestedObject', (req, res) => {
    eventDbFunctions.updateElementInArray({_id: req.params.idOfCollection}, req.params.arrayName,
        req.params.idOfNestedObject, req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.put('/:_id', (req, res) => {
    eventDbFunctions.updateOneRow(req.params, req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.delete('/delete/:arrayName/:_id', (req, res) => {
    const identifier = req.body.string || req.body;
    eventDbFunctions.deleteElementFromArray({_id: req.params._id}, req.params.arrayName, identifier)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.delete('/empty/:keyname', (req, res) => {
    eventDbFunctions.emptyKey(req.body, req.params.keyname).then(data => res.send(data)).catch(err => console.error(err));
});

route.delete('/:_id', (req, res) => {
    eventDbFunctions.deleteOneRow(req.params).then(data => res.send(data)).catch(err => console.error(err));
});

module.exports = route;