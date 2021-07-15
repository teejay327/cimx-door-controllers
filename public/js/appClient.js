console.log("client side activated ...");

const weatherForm = document.querySelector('.info-form');
const searchItem = document.querySelector('input');
const locationOutput = document.querySelector('#location-details');
const forecastOutput = document.querySelector('#location-forecast');

locationOutput.textContent = '';

weatherForm.addEventListener('submit', (e) => {
  // preventDefault prevents page refresh
  e.preventDefault();
  const location = searchItem.value;
  locationOutput.textContent = 'loading ...';
  forecastOutput.textContent = '';

  fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        locationOutput.textContent = data.error;
      } else {
        locationOutput.textContent = data.location;
        forecastOutput.textContent = data.forecast;
      }
    })
  });
});