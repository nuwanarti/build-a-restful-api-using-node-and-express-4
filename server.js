var express = require("express"); // importing the module express
var bodyParser = require("body-parser"); // importing the module body-parser

var mongoose = require("mongoose");
var Bear     = require('./app/models/bear');
mongoose.connect('mongodb://nuwanarti:freeznuwa@ds057176.mlab.com:57176/mymongo');


//var mongoose     = require('mongoose');
//var Schema       = mongoose.Schema;

var app = express(); // init express for our app... this is exactly what i was doing while creating the dictionary-api

app.use(bodyParser.urlencoded({extended:true})); // configure body parser to delever us the post content..even if the content is large enough
app.use(bodyParser.json());

var port = process.env.PORT || 8080; //setting the PORT
var router = express.Router(); // get an instance of the express Router

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


//handle get request to the root of our server
//when there is a get request to the server the trigger the callback function
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// this chunk of code is similar to above code..
// app.get("/api", function(req, res) {
// 	res.json({ message: 'hooray! welcome to our api!' });
// });




router.route('/bears').post(function(req , res){ //create a route for localhost:8080/api/bears
  // console.log(`bear name is :  ${req.body.name}`);
  var bear = new Bear(); /// create a new bear object in the class bear
  // bear.age = "lkdsfj";
  bear.name = req.body.name;
  // var personSchema = new Schema(
  //   {
  //     name: String,
  //     age: Number
  //   }
  // );
  // var Person = mongoose.model('Person', personSchema);
  // var person = new Person({name:"haraka2",age:5});
  // // var person = new Person();
  // // person.name = "haraka";
  // // person.age = 1;
  //
  // person.save(function(err){
  //     if (err)
  //       res.send(err);
  //     res.json({ message: 'person created!' });
  // });

  // console.log(`Bear name is : ${bear.name} and the ${req.body}`);
    
// get , put , delete are the methods on Schema... and these methods are look after interacting with mongo db....
  bear.save(function(err){
      if (err)
        res.send(err);
      res.json({ message: 'Bear created!' });
  });
})
.get(function(req , res){

  Bear.find(function(err, bears){
    if(err)
      res.send(err);
    res.json(bears);
  });
});

router.route('/bears/:bear_id')
.get(function(req , res){
  Bear.findById(req.params.bear_id , function(err, bear){
    if(err)
      res.send(err);
    res.json(bear);
  });
})
.put(function(req, res){
  Bear.findById(req.params.bear_id , function(err, bear){
    if(err)
      res.send(err);
    bear.name = req.body.name;
    bear.save(function(err){
      if(err)
        res.send(err);
      res.json({message : 'Bear Updated !!!'});
    });
  });
})
.delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'deleted the bear referenced on the id' });
        });
    });
// get request to the root of the server be prefixed with "api"
app.use('/api', router);

// listen the server on the port ... 8080....
app.listen(port);
console.log('Magic happens on port ' + port);
