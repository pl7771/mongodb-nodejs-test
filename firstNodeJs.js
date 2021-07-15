var MongoClient = require('mongodb').MongoClient, assert = require('assert');
//connect URL here
var url = 'mongodb://localhost:27017/myprojectdb';

MongoClient.connect(url, function(err, db){
    assert.equal(null, err);
    console.log("Connected to mongoDB");  
    //create collection
    var collection = db.collection('students'); 
    //create documents
    var std1 = {name: 'Ilya', standard : 10, subjects: ['Physics', 'Chemistry', 'Maths']};
    var std2 = {name: 'Val', standard : 11, subjects: ['Biology', 'Chemistry', 'Maths']};
    var std3 = {name: 'John', standard : 12, subjects: ['Statistics', 'Commerce', 'Maths']};
    
    collection.insert([std1, std2, std3], function(err, result){
        if(err){
            console.log(err);
        }else{
            console.log("docs inserted ", result.length, result);
        }
        //close connection
        db.close();
    }); 


    collection.update({name : 'John'}, {$set : {subjects : ['Science', 'History']}}, function(err, numUpdated){
        if(err) {
            console.log(err);
        }else if (numUpdated){
            console.log('updated ok %d docs', numUpdated);
        }else{
            console.log('no docs found');
        }
        db.close();
    });

    collection.find({name : 'John'}).toArray(function (err, result){
        if(err) {
            console.log(err);
        }else if (result.length){
            console.log('found ' +  result.length);
        }else{
            console.log('no docs found');
        }
        db.close();
    });
});