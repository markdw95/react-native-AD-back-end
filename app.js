const express = require('express');
require('dotenv').config();
require('./models/db');
const userRouter = require('./routes/user');
var path = require("path");

const User = require('./models/user');

const app = express();

app.use(express.json());
app.use(userRouter);

app.use(express.static(__dirname + '/public'));

app.get('/test', (req, res) => {
  res.send('Hello world');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/home.html'));
});

app.listen(8000, () => {
  console.log('port is listening');
});
