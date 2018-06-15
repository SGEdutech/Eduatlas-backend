const route = require('express').Router();
const Event = require('../modles/event');
const DbAPIClass = require('../api-functions');
const eventDbFunctions = new DbAPIClass(Event);

route.get('/all', (req, res) => {
    eventDbFunctions.getAllData().then(data => res.send(data)).catch(err => console.error(err));
});

route.get('/', (req, res) => {
    eventDbFunctions.getSpecificData(req.query).then(data => res.send(data)).catch(err => console.error(err));
});


route.post('/add/:arrayName/:_id', (req, res) => {
    schoolDbFunctions.addElementToArray({_id: req.params._id}, req.params.arrayName, req.body)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.post('/', (req, res) => {
    if (req.file) req.body.coverPic = req.file.filename;
    eventDbFunctions.addCollection(req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.put('/:_id', (req, res) => {
    eventDbFunctions.updateOneRow(req.params, req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.delete('/delete/:arrayName/:_id', (req, res) => {
    schoolDbFunctions.deleteElementFromArray({_id: req.params._id}, req.params.arrayName, req.body)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.delete('/:_id', (req, res) => {
    eventDbFunctions.deleteOneRow(req.params).then(data => res.send(data)).catch(err => console.error(err));
});

module.exports = route;