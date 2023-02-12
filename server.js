const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs')

function readCSVFile(file) {
  var dictionary = {};
  var lines = []
  lines = fs.readFileSync(file).toString().split('\n');
  for (var count = 1; count<lines.length - 1; count++) {
    buildingNumber = lines[count].split(',')[0];
    var line = lines[count].split(',');
    line[line.length-1] = line[line.length-1].split('\r')[0];
    line.shift(); 
    dictionary[buildingNumber] = line;
  }
  return dictionary;
}

app.use(express.static(__dirname + "/frontend"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/frontend/index.html");
})

app.get('/data/:data/:length', (req, res) => {
  index = 1
  switch(req.params["length"]) {
    case "day":
      index = 0
      break
      
    case "week":
      index = 1
      break

    case "month":
      index = 2
      break

    case "year":
      index = 3
      break

    default:
      console.log(req.params["length"])
      break
  }
  switch(req.params["data"]) {
    case "electricity":
      var data = readCSVFile("electricity.csv")
      break
    case "gas":
      var data = readCSVFile("gas.csv")
      break
    case "water":
      var data = readCSVFile("water.csv")
      break
    default:
      console.log("")
  }
  var senddata = []
  for (var key in data) {
    senddata.push([key, data[key][index]])
  }
  senddata = senddata.sort(function(a, b) {
    return b[1] - a[1];
  })
  res.send(senddata)
})

app.listen(port, () => {
  console.log("listening on port 3000")
})