const express = require('express');

const app = express();
const data = require('./data');

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

// ---------------------------------------
//  ROUTES
// ---------------------------------------

app.get('/about', (req, res, next) => {
  res.render('about');
  next();
});
app.get('/:id', (req, res, next) => {
  // 'id' is stored in req.params.id
  if (req.params.id >= 1 && req.params.id <= 5) {
    // For allowing human-friendly url #.
    const idZeroBased = req.params.id - 1;
    res.render('project', { project: data.projects[idZeroBased] });
    next();
  }
  next();
});
app.get('/', (req, res, next) => {
  res.render('index', { projects: data.projects });
  next();
});
// TO DO 404

app.listen(3000);
