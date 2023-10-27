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
    console.log("empty date parameter");
    date = new Date();
  }

  console.log(`input: ${date}`)
  
  if(/^\d+$/.test(date)){
    console.log("number");
    dateFormatted = new Date(Number(date));
  } else{
    console.log("date")
    dateFormatted = new Date(date);
  }
  console.log(dateFormatted)
  console.log(new Date("#####][][;"))
  console.log(dateFormatted === new Date("#####][][;"))
  if(isNaN(dateFormatted)){

    res.json({error: "Invalid Date"})
  }else{
    var isTimestamp = /^\d+$/.test(date);
    console.log(`is Timestamp: ${isTimestamp}`);

    console.log(`dateFormatted: ${dateFormatted}`);
    const dateNumber = Number(moment(dateFormatted).format('x'));
    console.log(`dateNumber: ${dateNumber}`);
    const dateString = `${moment(dateFormatted).format('ddd, DD MMM yyyy HH:mm:ss')} GMT`;
    console.log(`dateString: ${dateString}`)

    res.json({"unix": dateNumber, "utc": dateString})
  }
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
// var listener = app.listen(5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
