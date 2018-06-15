const route = require('express').Router();
const Tuition = require('../modles/tuition');
const DbAPIClass = require('../api-functions');
const tuitionDbFunctions = new DbAPIClass(Tuition);

route.get('/all', (req, res) => {
    tuitionDbFunctions.getAllData().then(data => res.send(data)).catch(err => console.error(err));
});

route.get('/', (req, res) => {
    tuitionDbFunctions.getSpecificData(req.query).then(data => res.send(data)).catch(err => console.error(err));
});

route.post('/add/:arrayName/:_id', (req, res) => {
    schoolDbFunctions.addElementToArray({_id: req.params._id}, req.params.arrayName, req.body)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.post('/', (req, res) => {
    if (req.file) req.body.coverPic = req.file.filename;
    tuitionDbFunctions.addCollection(req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.put('/:userId', (req, res) => {
    tuitionDbFunctions.updateOneRow(req.params, req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.delete('/delete/:arrayName/:_id', (req, res) => {
    schoolDbFunctions.deleteElementFromArray({_id: req.params._id}, req.params.arrayName, req.body)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.delete('/:userId', (req, res) => {
    tuitionDbFunctions.deleteOneRow(req.params).then(data => res.send(data)).catch(err => console.error(err));
});

module.exports = route;