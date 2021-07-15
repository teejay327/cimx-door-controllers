const request = require('request');

const geocode = (address, callback) => {
    const urlGeocode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidG9ueWo0OTA2IiwiYSI6ImNrcXV1ZzF6YzA4NDQybm4zaHl1MGh6N2wifQ.Fdgn9-_5qfEah2DMfQTQAg';
    // destructuring url and body as in forecast
    request({ url: urlGeocode, json: true}, (error, { body }) => {
      if (error) {
          callback('Unable to access location services', undefined);
      } else if (body.features.length === 0) {
          callback('Unable to find location', undefined);
      } else {
          callback(undefined, {
              latitude: body.features[0].center[1],
              longitude: body.features[0].center[0],
              location: body.features[0].place_name
          })
      }
    })
}

module.exports = geocode;