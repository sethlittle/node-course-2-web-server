const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); // takes directory of partials in views

// NEED TO RUN W "-e js, hbs" so nodemon watches all the extensions of server.js

app.set('View engine', 'hbs'); // key value pair

// making some middleware

app.use((req, res, next) => {
  // on req - http method, path, query parameters - everything coming from client
  // log or database request, middle ware only moves on when called next
  var now = new Date().toString(); // puts on terminal
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log); // human readable time stamp
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append server.log.');
    }
  });
  next(); // application coninues to run
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); // MIDDLEWARE 'use' registers it


hbs.registerHelper('getCurrentYear', () => { // 2 arguments, name and function to run
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', { // can use any view bc use render over set
    pageTitle: 'Home Page',
    welcomeMessage: 'Jenny is the best person in tha worlllddddddddddddd '
  });
}); // location (home directory), and function to run

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page', // object injected into template
    ProjectsMessage: 'Portfolio Page Here'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
      errorMessage: 'Error upon request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

// run nodenom server.js -e js,hbs to update hbs or else it wont render
