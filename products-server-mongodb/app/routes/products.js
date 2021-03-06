var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
var db;

MongoClient.connect('mongodb://localhost:27017', (err, database) => {
  if (err) return console.log(err)
  db = database.db('products')
})

/* GET ALL PRODUCTS */
router.get('/', (req, res) => {
  db.collection('items').find().sort({'name': 1}).toArray((err, result) => {
    if (err) return
    res.json(result)
  })
})

/* ADD PRODUCT TO DB */
router.post('/add', (req, res) => {
  db.collection('items').insertOne(req.body, function(err, res2) {
    res.json('{"success" : "ok"}')
  })
})

/* SEARCH PRODUCTS */
router.post('/searchAll', (req, res) => {
  //var query = { name: req.body.name }
  var query = { name: new RegExp('^' + req.body.name) }
  db.collection('items').find(query).toArray((err, result) => {
   if (err) return
   res.json(result)
 })
})

/* SEARCH ONE PRODUCT */
router.post('/searchOne', (req, res) => {
  var query = { name: req.body.name }
  db.collection('items').find(query).toArray((err, result) => {
   if (err) return
   res.json(result)
 })
})

/* DELETE A PRODUCT */
router.delete('/delete/:name', (req, res) => {
  db.collection('items').findOneAndDelete({ name: req.params.name })
})

/* EDIT A PRODUCT */
router.post('/edit', (req, res) => {
  db.collection('items').replaceOne({ name: req.body.name }, req.body, function(err, res2) {
    if(err) {
      console.log(err)
    }
    else {
      res.json('{"success" : "ok"}')
    }
  })
})

module.exports = router;