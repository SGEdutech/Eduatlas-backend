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

route.post('/', (req, res) => {
    schoolDbFunctions.addCollection(req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.put('/:userId', (req, res) => {
    schoolDbFunctions.updateOneRow(req.params, req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.delete('/:userId', (req, res) => {
    schoolDbFunctions.deleteOneRow(req.params).then(data => res.send(data)).catch(err => console.error(err));
});

module.exports = route;