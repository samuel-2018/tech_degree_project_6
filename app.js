const express = require('express');

const app = express();
const data = require('./data');

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

// ---------------------------------------
//  ROUTES
// ---------------------------------------

app.get('/', (req, res, next) => {
  res.render('index', { projects: data.projects });
});

app.get('/about', (req, res, next) => {
  // Using try/catch to catch errors
  try {
    res.render('about');
  } catch (error) {
    next(error);
  }
});

app.get('/:id', (req, res, next) => {
  // 'id' is stored in req.params.id
  if (req.params.id >= 1 && req.params.id <= 5) {
    // For allowing human-friendly url #.
    const idZeroBased = req.params.id - 1;
    res.render('project', { project: data.projects[idZeroBased] });
  }
  next();
});

// No matching url found, so creates a 404.
app.use((req, res, next) => {
  const err = new Error('Page not found.');
  err.status = 404;
  next(err);
});

// Handles all errors.
app.use((err, req, res, next) => {
  res.locals.error = err;
  if (err.status) {
    res.status(err.status);
  } else {
    // 500 Internal Server Error
    // (A '500' status has to be set manualy.)
    err.status = 500;
    res.status(err.status);
  }

  // Uses custom error page.
  res.render('error');
});

app.listen(3000);
