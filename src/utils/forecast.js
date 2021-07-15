const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=1ba5802a066e45f5b13132428210307&q=' + latitude + ',' + longitude;
    // request({ url: url, json: true }, (error, response) => { N.B. url is destructured below and also response is destructured
    request({ url, json: true }, (error, {body} ) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `Weather in ${body.location.name} at ${body.current.last_updated}: ${body.current.condition.text} with a temperature of ${body.current.temp_c} degrees Celsius`);
            console.log(`Weather in ${body.location.name} at ${body.current.last_updated}: ${body.current.condition.text} with a temperature of ${body.current.temp_c} degrees Celsius`);
        }
    });
}

module.exports = forecast;