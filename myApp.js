let express = require('express');
let app = express();
var bodyParser = require("body-parser");

require('dotenv').config();
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
  app.use("/public", express.static(__dirname + "/public"));
});

app.use(function middleware(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip)
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
}); 

app.post("/name", function(req, res) {
  // Handle the data in the request
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
}); 

app.get("/name", (req, res) => {
  
  res.json({
    name: req.query.first+" "+req.query.last
  });
}); 


app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") { res.json({ "message": "HELLO JSON" }); }
  else { res.json({ "message": "Hello json" }); }
});

app.get('/now', function (req, res, next) {
  req.time = Date().toString();
  next();
}, function (req, res) {
  res.send({ time: req.time });
});
app.listen(3000, () => {
  console.log("my app listening 3000 port")

});