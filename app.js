const express = require('express');

const app = express();

const data = require('./data');

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

// ---------------------------------------
//  ROUTES
// ---------------------------------------

// Index
app.get('/', (req, res, next) => {
  try {
    // Passed data is used for displaying info
    // and creating links for each project.
    res.render('index', { projects: data.projects });
  } catch (error) {
    next(error);
  }
});

// About
app.get('/about', (req, res, next) => {
  try {
    res.render('about');
  } catch (error) {
    next(error);
  }
});

// Project pages
app.get('/projects/:id', (req, res, next) => {
  // TO DO: Does the data in '/:id' need escaped?

  try {
    // The 'id' in '/:id' is stored, behind the scenes, in req.params.id.

    // Looks for a matching id(url).
    // Returns an object with data needed to create the requested page.
    const project = data.projects.filter(item => item.id === req.params.id)[0];

    // If 'project' is not empty, then there is a matching page.
    if (project) {
      res.render('project', { project });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

// No matching url found, so creates a 404.
app.use((req, res, next) => {
  // Logs to terminal
  console.error('404: Page not found.');

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
