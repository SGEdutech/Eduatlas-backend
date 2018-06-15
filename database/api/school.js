const route = require('express').Router();
const School = require('../modles/school');
const DbAPIClass = require('../api-functions');
const schoolDbFunctions = new DbAPIClass(School);

route.get('/all', (req, res) => {
    schoolDbFunctions.getAllData().then(data => res.send(data)).catch(err => console.error(err));
});

route.get('/', (req, res) => {
    schoolDbFunctions.getSpecificData(req.query).then(data => res.send(data)).catch(err => console.error(err));
});

route.post('/add/:arrayName/:_id', (req, res) => {
    schoolDbFunctions.addElementToArray({_id: req.params._id}, req.params.arrayName, req.body)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.post('/', (req, res) => {
    if (req.file) req.body.coverPic = req.file.filename;
    schoolDbFunctions.addCollection(req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.put('/:_id', (req, res) => {
    schoolDbFunctions.updateOneRow(req.params, req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.delete('/delete/:_id/:arrayName', (req, res) => {
    schoolDbFunctions.deleteElementFromArray({_id: req.params._id}, req.params.arrayName, req.body)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.delete('/:_id', (req, res) => {
    schoolDbFunctions.deleteOneRow(req.params).then(data => res.send(data)).catch(err => console.error(err));
});

module.exports = route;