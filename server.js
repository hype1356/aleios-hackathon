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

app.get('/data/:data/:length', (req, res) => {
  switch(req.params["data"]) {
    case "electricity":
      res.send([1,2,3,4,5])
      break
    case "gas":
      res.send([2,3,4,5,6])
      break
    case "water":
      res.send([3,4,5,6,7])
      break
    default:
      console.log("")
  }
})

app.listen(port, () => {
  console.log("listening on port 3000")
})