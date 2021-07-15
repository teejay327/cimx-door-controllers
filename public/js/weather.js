const request = require('request');
const url = 'http://api.weatherapi.com/v1/current.json?key=1ba5802a066e45f5b13132428210307&q=Brisbane';

request({ url: url, json: true }, (error, response) => {
  console.log(response.body.current);
})