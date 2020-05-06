

//select elements

const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');



//App data

const weather = {};




weather.temperature = {
	unit: "celcius"
}



//app consts and  vars
const KELVIN = 273;

//api key

const key = "82005d27a116c2880c8f0fcb866998a0";


//check if browser supports geolocation
function getLocation() {
	if('geolocation' in navigator){
		navigator.geolocation.getCurrentPosition(setPosition,showError);
	} else {
		notificationElement.style.display = "block";
		notificationElement.innerHTML = "<p>Browser dosen't support geolocation</p>";
	}
}

getLocation();
function setPosition(position){
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;

	getWeather(latitude, longitude);
}


function showError(error) {
/* 
  switch(error.code) {
    case error.PERMISSION_DENIED:
      notificationElement.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      notificationElement.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      notificationElement.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      notificationElement.innerHTML = "An unknown error occurred."
      break;
  }

   notificationElement.style.display = "block";

   */

	notificationElement.style.display = "block";
	notificationElement.innerHTML = `<p>${error.message}</p>`;

} 

function getWeather(latitude,longitude){
	let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;


	fetch(api)
		.then(response => {
			let data = response.json();
			return data;
			console.log(data);
		})
		.then(data => {
			weather.temperature.value = Math.floor(data.main.temp - KELVIN);
			weather.description = data.weather[0].icon;
			weather.iconId = data.weather[0].icon;
			weather.city = data.name;
			weather.country = data.sys.country;
		})

		
}
