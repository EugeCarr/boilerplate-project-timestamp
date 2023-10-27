// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment')
// first commit
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res){
  var {date} = req.params;
  var dateFormatted;
  if(typeof(date) === typeof(undefined)){
    date = new Date();
  }
  
  if(/^\d+$/.test(date)){
    dateFormatted = new Date(Number(date));
  } else{
    dateFormatted = new Date(date);
  }

  if(isNaN(dateFormatted)){
    res.json({error: "Invalid Date"})
  }else{
    const dateNumber = Number(moment(dateFormatted).format('x'));
    const dateString = `${moment(dateFormatted).format('ddd, DD MMM yyyy HH:mm:ss')} GMT`;

    res.json({"unix": dateNumber, "utc": dateString})
  }
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
// var listener = app.listen(5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
