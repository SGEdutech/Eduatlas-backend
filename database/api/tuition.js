const route = require('express').Router();
const Tuition = require('../modles/tuition');
const escapeRegex = require('../../scripts/escape-regex');
const DbAPIClass = require('../api-functions');
const tuitionDbFunctions = new DbAPIClass(Tuition);

route.get('/all', (req, res) => {
    const queryObject = req.query;
    let skip;
    let limit;
    queryObject.skip ? skip = parseInt(queryObject.skip) : skip = 0;
    queryObject.limit ? limit = parseInt(queryObject.limit) : limit = 0;
    tuitionDbFunctions.getAllData(queryObject.demands, skip, limit)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.get('/', (req, res) => {
    tuitionDbFunctions.getSpecificData(req.query, true).then(data => res.send(data)).catch(err => console.error(err));
});

route.get('/search', (req, res) => {
    const queryObject = req.query;
    let demands = '';
    let skip = 0;
    let limit = 0;
    let sortBy;
    if (queryObject.demands) {
        demands = queryObject.demands;
        delete queryObject.demands;
    }
    if (queryObject.skip) {
        skip = parseInt(queryObject.skip);
        delete queryObject.skip;
    }
    if (queryObject.limit) {
        limit = parseInt(queryObject.limit);
        delete queryObject.limit;
    }
    if (queryObject.sortBy) {
        sortBy = queryObject.sortBy;
        delete queryObject.sortBy;
    }
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
    let elementToBePushed;
    req.body.string ? elementToBePushed = req.body.string : elementToBePushed = req.body;
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
    tuitionDbFunctions.updateOneRow(req.params, req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.delete('/delete/:arrayName/:_id', (req, res) => {
    tuitionDbFunctions.deleteElementFromArray({_id: req.params._id}, req.params.arrayName, req.body)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.delete('/:_id', (req, res) => {
    // if (req.params._id.match(/^[0-9a-fA-F]{24}$/) === null) res.send('Not a valid id');
    tuitionDbFunctions.deleteOneRow(req.params).then(data => res.send(data)).catch(err => console.error(err));
});

module.exports = route;