const route = require('express').Router();
const User = require('../modles/user');
const DbAPIClass = require('../api-functions');
const userDbFunctions = new DbAPIClass(User);

route.get('/all', (req, res) => {
    userDbFunctions.getAllData().then(data => res.send(data)).catch(err => console.error(err));
});

route.get('/', (req, res) => {
    userDbFunctions.getSpecificData(req.query).then(data => res.send(data)).catch(err => console.error(err));
});

route.post('/', (req, res) => {
    userDbFunctions.addCollection(req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.put('/:userId', (req, res) => {
    userDbFunctions.updateOneRow(req.params, req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.delete('/:userId', (req, res) => {
    userDbFunctions.deleteOneRow(req.params).then(data => res.send(data)).catch(err => console.error(err));
});

module.exports = route;