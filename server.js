const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/frontend"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/frontend/index.html");
})

app.listen(port, () => {
  console.log("listening on port 3000")
})