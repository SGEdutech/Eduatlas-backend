const route = require('express').Router();
const Tuition = require('../modles/tuition');
const DbAPIClass = require('../api-functions');
const tuitionDbFunctions = new DbAPIClass(Tuition);


route.get('/all', (req, res) => {
    const skip = (req.query.page - 1) * req.query.items;
    const limit = parseInt(req.query.items);
    tuitionDbFunctions.getAllData(req.query.demands, skip, limit)
        .then(data => res.send(data))
        .catch(err => console.error(err));
});

route.get('/', (req, res) => {
    tuitionDbFunctions.getSpecificData(req.query).then(data => {
        const done = sendSlicedArrIfRequested(req, res, data);
        if (done === false) res.send(data);
    }).catch(err => console.error(err));
});

route.get('/search', (req, res) => {
    Tuition.find({$text: {$search: req.query.search}}).then(data => res.send(data)).catch(err => console.log(err))
    /*.skip(20)
    .limit(10)
    .exec(function (err, docs) {
    console.log(docs)
    })*/
});

route.post('/add/:arrayName/:_id', (req, res) => {
    tuitionDbFunctions.addElementToArray({_id: req.params._id}, req.params.arrayName, req.body)
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
    if (req.params._id.match(/^[0-9a-fA-F]{24}$/) === null) res.send('Not a valid id');
    tuitionDbFunctions.deleteOneRow(req.params).then(data => res.send(data)).catch(err => console.error(err));
});

module.exports = route;