var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
//var assert = require('assert');
var express = require('express');
var app = express();
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");
var db = null;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 	
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use('/', express.static(path.resolve("../client/app")));
app.use('/', express.static(path.resolve("../client/bower_components")));
app.use('/', express.static(path.resolve("../client/tmp")));


var url = 'mongodb://localhost:27017/dmpanel';
MongoClient.connect(url, function(err, database) {
    db = database;
});

app.post('/doEditEmp', function(req, res){
    empToEdit = req.body;
    db.collection('empList').update({
        _id: new mongodb.ObjectID(empToEdit.emp._id)
    },{
        name: empToEdit.updatedEmp.name,
        surname: empToEdit.updatedEmp.surname,
        job: empToEdit.updatedEmp.job,
        loc: empToEdit.updatedEmp.loc
    });
    res.end();
})

app.post('/removeEmp', function(req, res){
    var empToRemove = req.body;
    console.log(empToRemove);
    db.collection('empList').remove({
        _id: new mongodb.ObjectID(empToRemove._id)
    }, true);
    res.end();
})

app.post('/addEmp', function(req, res){
    var emp = req.body;
    db.collection('empList').insertOne(emp, function(err, result){
        res.end();
    });
    
})

app.get('/getEmpList', function(req, res) {
    
//    var empList = db.collection.find().toArray();
    
    db.collection('empList').find().toArray(function(err, data){
        console.log(data);
        res.end(JSON.stringify(data));
    })
    
//    console.log(empList);
    
//    db.createCollection('empList', function(err, coll){
//        coll.insert(empList, function(err, docs){
//            console.log(err);
//            console.log(docs);
//        })
//    })
//    res.sendFile("../client/app/index.html");
//    var zmienna = db.collection('empList').find();
    
//    res.send(JSON.stringify(empList));
})

var server = app.listen(7001, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})