import './style.css'

async function getCurrentWeatherData(city='london'){
  const resp = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=b00ef59dc62e4d45bcf61559232003&q=${city}&aqi=yes`
  );
  const respJson = await resp.json();
  return respJson;
}

async function trimCurrentData(respJson) {
  const resp = await respJson;
  const tempInC = resp.current.temp_c;
  const tempInF = resp.current.temp_f;
  const feelsLikeC = resp.current.feelslike_c;
  const feelsLikeF = resp.current.feelslike_f;
  const lastUpdated = resp.current.last_updated;

  const country = resp.location.country;
  const city = resp.location.name;

  const condition = resp.current.condition.text;

  const windDir = resp.current.wind_dir;
  const windKph = resp.current.wind_kph;
  const windMph = resp.current.wind_mph;

  const cloud = resp.current.cloud;
  const humidity = resp.current.humidity;
  return [
    country,
    city,
    condition,
    lastUpdated,
    tempInC,
    tempInF,
    feelsLikeC,
    feelsLikeF,
    humidity,
    cloud,
    windDir,
    windKph,
    windMph,
  ];
}


async function showCurrentWeatherData(cityName){
  const content = document.getElementById('content');
  const currentData = await getCurrentWeatherData(cityName);
  const trimmedData = await trimCurrentData(currentData);
  trimmedData.forEach((data) => {
    const div = document.createElement('div');
    div.innerHTML = data;
    content.append(div);
  });
}

async function getForecast(city = "london") {
  const resp = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=b00ef59dc62e4d45bcf61559232003&q=${city}&days=8&aqi=yes&alerts=no`
  );
  const respJson = await resp.json();
  return respJson;
}

async function trimForecastData(respJson) {
  const resp = await respJson;
  const sevenDays = resp.forecast.forecastday;
  const sevenDaysData = await sevenDays.map(item => foreCastTrimPerDay(item));
  return sevenDaysData;
}


function foreCastTrimPerDay(respDay) {
  const resp = respDay;
  const date = resp.date;
  const day = resp.day;


  const averageTempInC = day.avgtemp_c;
  const averageTempInF = day.avgtemp_f;
  const maxWindMph = day.maxwind_mph;
  const maxWindKph = day.maxwind_kph;
  const avgHumidity = day.avghumidity;
  const condition = day.condition.text;

  return [
    date,
    averageTempInC,
    averageTempInF,
    maxWindKph,
    maxWindMph,
    avgHumidity,
    condition,
  ];
}

async function showForeCastWeatherData(cityName){
  const forecast = document.getElementById('forecast');
  const forecastData = await getForecast(cityName);
  const trimmedData = await trimForecastData(forecastData);
  trimmedData.forEach((data) => {
    const li = document.createElement('li');
    li.innerHTML = data;
    forecast.append(li);
  })
}

function getCityName(event){
  event.preventDefault();
  const city = document.getElementById('cityName');
  showCurrentWeatherData(city.value);
  showForeCastWeatherData(city.value);
  city.value = '';
}

const form = document.getElementById('form');
form.addEventListener('submit', function(e){
  getCityName(e);
})

window.onload = () =>{
  showCurrentWeatherData('lashio');
  showForeCastWeatherData('lashio');
}