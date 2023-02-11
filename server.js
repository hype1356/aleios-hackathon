const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs')

function readCSVFile() {
  fs.readFile("dummy.csv", (err, input) => {
    if (err) throw err;
    console.log(input.toString());
  })
}

app.use(express.static(__dirname + "/frontend"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/frontend/index.html");
})

app.get('/data/day', (req, res) => {
  console.log("test")
  res.json({test})
})

app.listen(port, () => {
  console.log("listening on port 3000")
})