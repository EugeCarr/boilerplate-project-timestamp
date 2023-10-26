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

app.get("/api/:date", function(req, res){
  const {date} = req.params;
  console.log(date);
  const dateNumber = Number(Date.parse(date));
  console.log(dateNumber);
  const dateString = `${moment(dateNumber).format('ddd, DD MMM yyyy hh:mm:ss')} GMT`;
  console.log(dateString)

  console.log(dateNumber);
  res.json({"unix": dateNumber, "utc": dateString})
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
