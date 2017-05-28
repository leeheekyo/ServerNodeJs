var MongoClient = require('mongodb').MongoClient;

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    //BSON = require('mongodb').pure().BSON,
    assert = require('assert');

var db = new Db('local', new Server('localhost', 27017));
db.open(function(err, db) {
    var collection = db.collection("menu");
    // Fetch the document
    collection.findOne({}, function(err, item) {
      console.log(item);//collenction.findOne({id:'admin'}));
      assert.equal(null, err);
      //assert.equal('world_safe2', item.hello);
      db.close();
    })
  
})