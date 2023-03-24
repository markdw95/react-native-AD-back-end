const express = require('express');
require('dotenv').config();
require('./models/db');
const userRouter = require('./routes/user');
var path = require("path");

const app = express();

app.use(express.json());
app.use(userRouter);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/home.html'));
});

app.listen(8000, () => {
  console.log('Port is listening');
});
