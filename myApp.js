let express = require('express');
let app = express();

require('dotenv').config();
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
  app.use("/public", express.static(__dirname + "/public"));
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