

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

	if('geolocation' in navigator){
		navigator.geolocation.getCurrentPosition(setPosition,showError);
	} else {
		notificationElement.style.display = "block";
		notificationElement.innerHTML = "<p>Browser dosen't support geolocation</p>";
	}

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
		})
		.then(data => {
			weather.temperature.value = Math.floor(data.main.temp - KELVIN);
			weather.description = data.weather[0].description;
			weather.iconId = data.weather[0].icon;
			weather.city = data.name;
			weather.country = data.sys.country;
		})
		.then(()=> updateUI())
}


function updateUI(){
	iconElement.innerHTML = `<img src="./icons/${weather.iconId}.png" alt="">`;
	tempElement.innerHTML = `${weather.temperature.value}&#x2103`	
	descElement.innerHTML = `<p>${weather.description}</p>`
	locationElement.innerHTML = `<p>${weather.country},${weather.city}</p>`
}


//C to F
function celsiusToFahrenheid(temperature){
	return (temperature * 9/5) + 32;
}

//eventListener
tempElement.addEventListener('click', () => {
	if(weather.temperature.value === undefined) return;
		
		if(weather.temperature.unit == "celcius"){
			let fahrenheit = celsiusToFahrenheid(weather.temperature.value);
			fahrenheit = Math.floor(fahrenheit);

			tempElement.innerHTML = `${fahrenheit}&#x2109`;
			weather.temperature.unit = "fahrenheit";
		} else {

			tempElement.innerHTML = `${weather.temperature.value}&#x2103`;
			
			weather.temperature.unit = "celcius";
		}
	});
