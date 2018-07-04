const route = require('express').Router();
const Event = require('../modles/event');
const DbAPIClass = require('../api-functions');
const sendSlicedArrIfRequested = require('../../scripts/pagination');
const eventDbFunctions = new DbAPIClass(Event);

route.get('/all', (req, res) => {
    eventDbFunctions.getAllData(req.query.demands).then(data => {
        const done = sendSlicedArrIfRequested(req, res, data);
        if (done === false) res.send(data);
    }).catch(err => console.error(err));
});

route.get('/', (req, res) => {
    eventDbFunctions.getSpecificData(req.query).then(data => {
        const done = sendSlicedArrIfRequested(req, res, data);
        if (done === false) res.send(data);
    }).catch(err => console.error(err));
});


route.post('/add/:arrayName/:_id', (req, res) => {
    eventDbFunctions.addElementToArray({_id: req.params._id}, req.params.arrayName, req.body)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.post('/', (req, res) => {
    if (req.file) req.body.coverPic = req.file.filename;
    eventDbFunctions.addCollection(req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.put('/update/:idOfCollection/:arrayName/:idOfNestedObject', (req, res) => {
    schoolDbFunctions.updateElementInArray({_id: req.params.idOfCollection}, req.params.arrayName,
        req.params.idOfNestedObject, req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.put('/:_id', (req, res) => {
    eventDbFunctions.updateOneRow(req.params, req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.delete('/delete/:arrayName/:_id', (req, res) => {

    eventDbFunctions.deleteElementFromArray({_id: req.params._id}, req.params.arrayName, req.body)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.delete('/:_id', (req, res) => {
    eventDbFunctions.deleteOneRow(req.params).then(data => res.send(data)).catch(err => console.error(err));
});

module.exports = route;