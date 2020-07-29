const app = require('../../server').app;

module.exports = app

app.get('/', function (req, res) {
  res.send("bla!")
})