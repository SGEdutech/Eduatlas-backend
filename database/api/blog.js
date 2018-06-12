const route = require('express').Router();
const Blog = require('../modles/blog');
const DbAPIClass = require('../api-functions');
const blogDbFunctions = new DbAPIClass(Blog);

route.get('/all', (req, res) => {
    blogDbFunctions.getAllData().then(data => res.send(data)).catch(err => console.error(err));
});

route.get('/', (req, res) => {
    blogDbFunctions.getSpecificData(req.query).then(data => res.send(data)).catch(err => console.error(err));
});

route.post('/', (req, res) => {
    blogDbFunctions.addCollection(req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.put('/:blogId', (req, res) => {
    blogDbFunctions.updateOneRow(req.params, req.body).then(data => res.send(data)).catch(err => console.error(err));
});

route.delete('/:blogId', (req, res) => {
    blogDbFunctions.deleteOneRow(req.params).then(data => res.send(data)).catch(err => console.error(err));
});

module.exports = route;