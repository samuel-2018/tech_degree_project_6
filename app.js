const express = require('express');

const app = express();
const data = require('./data');

app.set('view engine', 'pug');


app.listen(3000);
