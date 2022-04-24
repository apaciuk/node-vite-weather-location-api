import './style.css'

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY
const GEOLOCATION_URL = "https://ip-geo-location.p.rapidapi.com/ip/check"
const GEOLOCATION_HOST = "ip-geo-location.p.rapidapi.com"
const WEATHER_URL = "https://community-open-weather-map.p.rapidapi.com/weather?units=imperial&q="
const WEATHER_HOST = "community-open-weather-map.p.rapidapi.com"
const NEWS_URL = "https://latest-breaking-news-live.p.rapidapi.com/latest-breaking-news"
const NEWS_HOST = "latest-breaking-news-live.p.rapidapi.com"


const getData = async (url, host) => { 
  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
      'x-rapidapi-host': host,
      'x-rapidapi-key': RAPIDAPI_KEY
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json()
};

const runApiQueries = async () => { 
 const app = document.getElementById('app')
// GET CITY NAME
const geoData = await getData(GEOLOCATION_URL, GEOLOCATION_HOST);
console.log(geoData);
// GET WEATHER DATA BY CITY
const weatherData = await getData(
  WEATHER_URL + geoData.city.name, 
  WEATHER_HOST);
console.log(weatherData); 
// UPDATE UI
app.innerHTML += /*html*/ `
<div class="container text-center
    <div class="alert alert-primary" role="alert"><h1>Mixed API Feed</h1></div>
    <div class="col-md-12 text-center"> 
      <h1>${weatherData.weather[0].main}</h1> 
      <h2>${parseInt(weatherData.main.temp)}</h2> 
      <h4>${weatherData.weather[0].description.toUpperCase()}</h4>
      <div class="flex-container">
      <img class="img-fluid" src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png" alt="Icon">
     <h3>${weatherData.name}</h3> 
 
     </div>
     </div>
     </div>
     </div> `
// GET LATEST NEWS
const newsData = await getData(NEWS_URL, NEWS_HOST);
console.log(newsData);
// UPDATE UI
}
runApiQueries();


