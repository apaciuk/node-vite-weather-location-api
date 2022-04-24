import './style.css'

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY
const GEOLOCATION_URL = "https://ip-geo-location.p.rapidapi.com/ip/check"
const GEOLOCATION_HOST = "ip-geo-location.p.rapidapi.com"
const WEATHER_URL = "https://community-open-weather-map.p.rapidapi.com/weather?units=imperial&q="
const WEATHER_HOST = "community-open-weather-map.p.rapidapi.com"

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
// GET CITY NAME
const geoData = await getData(GEOLOCATION_URL, GEOLOCATION_HOST);
console.log(geoData);
// GET WEATHER DATA BY CITY
const weatherData = await getData(
  WEATHER_URL + geoData.city.name, 
  WEATHER_HOST);
console.log(weatherData);
}

runApiQueries();


