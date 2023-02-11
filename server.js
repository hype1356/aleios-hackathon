const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs')

function readCSVFile() {
  fs.readFile("dummy.csv", (err, input) => {
    if (err) throw err;
    var lines = input.toString().split('\n');
    var dictionary = new Object();
    for (var count = 0; count<lines.length - 1; count++) {
      var buildingNumber = lines[count].split(',')[0];
      var line = lines[count].split(',');
      line[line.length-1] = line[line.length-1].split('\r')[0];
      line.shift(); 
      for (let number of line) {
        console.log(number);
      }
      dictionary[buildingNumber] = line;
    }
  })
}

app.use(express.static(__dirname + "/frontend"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/frontend/index.html");
})

app.get('/data/:data/:length', (req, res) => {
  switch(req.params["data"]) {
    case "electricity":
      res.send([[1,2],[3,4],[5,6],[7,8],[9,10]])
      break
    case "gas":
      res.send([[1,2],[3,4],[5,6],[7,8],[9,10]])
      break
    case "water":
      res.send([[1,2],[3,4],[5,6],[7,8],[9,10]])
      break
    default:
      console.log("")
  }
})

app.listen(port, () => {
  console.log("listening on port 3000")
})