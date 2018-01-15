var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* We cache the content to prevent constant database calls. */
CONTENT = {
  "meetingroom" : "Royce Hall 362",
  "meetingday" : "Thursdays",
  "meetingtime" : "7-9PM",
  "about" : [
      "We're UCLA's official anime club! Welcome to our site! (ﾉ´ヮ´)ﾉ*:･ﾟ✧",
      "We’re a club dedicated to facilitating both on and off-campus gatherings for the appreciation of Japanese anime and culture! We welcome all anime fans to join us at our club-hosted events and local conventions, to meet with others who share the same passion for art and entertainment.",
      "We have weekly club meetings, currently held on %d% %t% in %r%. Please join us for screenings, awesome events, raffles, karaoke, cosplay, and much, much more!",
      "UCLA's Japanese Animation Club is part of a larger network of collegiate anime clubs in California called \"Cal Animage\". The Cal-Animage network initially started so that different schools could work together to exchange manga/fansubbed tapes, since they were somewhat difficult to find back then.",
      "The club's original name was \"Cal-Animage Eta\", which means we're the 7th Cal-Animage chapter. Cal-Animage Alpha is in UC Berkeley. Cal-Animage Eta was founded over 25 years ago, making JAC one the oldest clubs at UCLA!"
  ]
}
var resetContent = true;

app.get('/setcontent', function(req, res) {
  if (CONTENT == null || resetContent) {
    resetContent = false;

    console.log("Querying database.");
    MongoClient.connect('', function(err,db){
      if (err) throw err;
      var database = db.db(db.s.options.dbName); // Required to specify db name in new mongodb versions.
      var collection = database.collection('anime');

      collection.count({}, function(err, num){
          res.render('setcontent', CONTENT);
      });
    });
  } else {
    res.render('setcontent', CONTENT);
  }
});

app.post('/setcontent', function(req, res) {
  MongoClient.connect('', function(err,db){
    var database = db.db(db.s.options.dbName); // Required to specify db name in new mongodb versions.
    var collection = database.collection('anime');

    if (req.body.contentpass == "owo") {
      CONTENT.meetingroom = req.body.meetingroom;
      CONTENT.meetingday = req.body.meetingday;
      CONTENT.meetingtime = req.body.meetingtime;
      CONTENT.about = [req.body.about];

      console.log("Updated content.");
      // Update content in database as well.
    }
    res.redirect("/");
  });
});

app.get('/mongo', function(req, res, next) {
  if (CONTENT == null || resetContent) {
    resetContent = false;

    console.log("Querying database.");
    MongoClient.connect('', function(err,db){
      if (err) throw err;
      var database = db.db(db.s.options.dbName); // Required to specify db name in new mongodb versions.
      var collection = database.collection('anime');

      collection.count({}, function(err, num){
        res.json(CONTENT);
      });
    });
  } else {
    res.json(CONTENT);
  }
});

module.exports = app;
