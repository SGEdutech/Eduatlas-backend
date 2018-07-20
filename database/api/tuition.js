const route = require('express').Router();
const Tuition = require('../modles/tuition');
const escapeRegex = require('../../scripts/escape-regex');
const DbAPIClass = require('../api-functions');
const tuitionDbFunctions = new DbAPIClass(Tuition);

route.get('/all', (req, res) => {
    const queryObject = req.query;
    let skip = parseInt(queryObject.skip) || 0;
    let limit = parseInt(queryObject.limit) || 0;
    tuitionDbFunctions.getAllData(queryObject.demands, skip, limit)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.get('/', (req, res) => {
    tuitionDbFunctions.getSpecificData(req.query, true).then(data => res.send(data)).catch(err => console.error(err));
});

route.get('/search', (req, res) => {
    const queryObject = req.query;
    const demands = queryObject.demands || '';
    const skip = parseInt(queryObject.skip) || 0;
    const limit = parseInt(queryObject.limit) || 0;
    const sortBy = queryObject.sortBy || '';

    delete queryObject.demands;
    delete queryObject.skip;
    delete queryObject.limit;
    delete queryObject.sortBy;

    const searchCriteria = {};
    const queryKeys = Object.keys(queryObject);
    queryKeys.forEach(key => {
        const value = JSON.parse(queryObject[key]);
        if (value.fullTextSearch) {
            searchCriteria[key] = new RegExp(`^${escapeRegex(value.search)}$`, 'i');
        } else {
            searchCriteria[key] = new RegExp(escapeRegex(value.search), 'i');
        }
    });
    tuitionDbFunctions.getMultipleData(searchCriteria, demands, skip, limit, sortBy).then(data => res.send(data));
});

route.post('/add/:arrayName/:_id', (req, res) => {
    let elementToBePushed = req.body.string || req.body;
    tuitionDbFunctions.addElementToArray({_id: req.params._id}, req.params.arrayName, elementToBePushed)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.post('/', (req, res) => {
    if (req.file) req.body.img_coverPic = req.file.filename;
    tuitionDbFunctions.addCollection(req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.put('/update/:idOfCollection/:arrayName/:idOfNestedObject', (req, res) => {
    tuitionDbFunctions.updateElementInArray({_id: req.params.idOfCollection}, req.params.arrayName,
        req.params.idOfNestedObject, req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.put('/:_id', (req, res) => {
    console.log(req.params)
    tuitionDbFunctions.updateOneRow(req.params, req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.delete('/delete/:arrayName/:_id', (req, res) => {
    const identifier = req.body.string || req.body;
    tuitionDbFunctions.deleteElementFromArray({_id: req.params._id}, req.params.arrayName, identifier)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.delete('/:_id', (req, res) => {
    // if (req.params._id.match(/^[0-9a-fA-F]{24}$/) === null) res.send('Not a valid id');
    tuitionDbFunctions.deleteOneRow(req.params).then(data => res.send(data)).catch(err => console.error(err));
});

module.exports = route;