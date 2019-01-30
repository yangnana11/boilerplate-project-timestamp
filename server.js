// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/", function(req,res){    
  let date = new Date();
  res.json({unix: Date.parse(date), utc: date.toUTCString()});
});

app.get("/api/timestamp/:date_string", function(req,res){    
  let date = new Date(req.params.date_string);
  if (date != "Invalid Date") {
    res.json({unix: Date.parse(date), utc: date.toUTCString()});
  } else {    
    let regEx = /[a-zA-Z]/g;
    if (regEx.test(req.params.date_string)) {
      res.json({"error" : "Invalid Date"});
    } else {
      let unix = parseInt(req.params.date_string) * 1000;
      date = new Date(unix);
      if (date != "Invalid Date") {
        res.json({unix: unix, utc: date.toUTCString()});
      } else {
        res.json({"error" : "Invalid Date"});
      }    
    }    
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});