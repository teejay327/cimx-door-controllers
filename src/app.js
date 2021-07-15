const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Home'
  })
});

app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login'
  })
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location }) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, dataForecast) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: dataForecast,
        location,
        address: req.query.address
      })
    })
  })
});

  //res.send({
  //  forecast: "Cool night",
  //  location: "Sydney",
  //  address: req.query.address
  //})

// report any other requests as 404s
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found'
  })
}
)

app.listen(3000, () => {
  console.log("server is up on Port 3000");
})