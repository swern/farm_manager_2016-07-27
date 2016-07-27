var express = require('express');
var app = express();
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var ObjectID = mongodb.ObjectID;

app.use(bodyParser.json() );

app.post('/animals', function(req, res){
  console.log(req.body)
  res.status(200).end();
  var url = 'mongodb://localhost:27017/farm';
  MongoClient.connect( url, function( err, db ){ 
    var collection = db.collection('animals');
    collection.insert(req.body)
      db.close();
    })
  });

app.get('/animals', function(req, res) {
  var url = 'mongodb://localhost:27017/farm';
  MongoClient.connect( url, function( err, db ) {
    var collection = db.collection('animals')
    collection.find({}).toArray( function(err, docs){
      res.json(docs);
      res.status(200).end();
      db.close();
    })
  })
})

app.put('/animals/:id', function(req, res){
  var url = 'mongodb://localhost:27017/farm';
  MongoClient.connect(url, function(err,db){
    var collection = db.collection('animals')
 
    collection.updateOne({_id: new ObjectID(req.params.id)}, {$set: {name: req.body.name, type: req.body.type, age: req.body.age}});
    res.status(200).end();
    db.close();
  })
})

app.delete('/animals/:id', function(req, res){
  var url = 'mongodb://localhost:27017/farm';
  MongoClient.connect(url, function(err,db){
    var collection = db.collection('animals')

    collection.remove({_id: new ObjectID(req.params.id)}, {$set: {name: req.body.name, type: req.body.type, age: req.body.age}});
    res.status(200).end();
    db.close();
  })
})


app.listen('3000', function(){
  console.log('running on 3000!');
})