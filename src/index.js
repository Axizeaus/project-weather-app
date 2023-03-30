import './style.css'

async function getCurrentWeatherData(city='london'){
  const resp = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=b00ef59dc62e4d45bcf61559232003&q=${city}&aqi=yes`
  );
  const respJson = await resp.json();
  return respJson;
}

// helper function to get var name as string
const varToString = varObj => Object.keys(varObj)[0]

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
  const h1 = document.createElement('h1');
  h1.innerHTML = 'Current Weather Data';
  content.append(h1);
  const dataNames = [
    'country',
    'city',
    'condition',
    'lastUpdated',
    'tempInC',
    'tempInF',
    'feelsLikeC',
    'feelsLikeF',
    'humidity',
    'cloud',
    'windDir',
    'windKph',
    'windMph',
  ];
  for (let i = 0; i < dataNames.length; i++){
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = dataNames[i] + " : " + trimmedData[i];
    content.append(div);
  }
}

async function getForecast(city = "london") {
  const resp = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=b00ef59dc62e4d45bcf61559232003&q=${city}&days=8&aqi=yes&alerts=no`
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
  const h2 = document.createElement('h2');
  h2.innerHTML = 'Forecast Data';
  forecast.append(h2);
  const dataNames = [
    'date',
    'averageTempInC',
    'averageTempInF',
    'maxWindKph',
    'maxWindMph',
    'avgHumidity',
    'condition',
  ];
  for (let i = 0; i < trimmedData.length; i++){
    const data = trimmedData[i]
    const card = document.createElement('div');
    card.classList.add('card');
    for (let i = 0; i < dataNames.length; i++){
      const div = document.createElement('div');
      div.innerHTML = dataNames[i] + ' : '+ data[i];
      card.append(div);
    }
    forecast.append(card);
  }
}

function getCityName(event){
  event.preventDefault();
  const city = document.getElementById('cityName');
  showCurrentWeatherData(city.value);
  showForeCastWeatherData(city.value);
  city.value = '';
}

function clearScreen(){
  document.getElementById('content').innerHTML = '';
  document.getElementById('forecast').innerHTML = '';
}

const form = document.getElementById('form');
form.addEventListener('submit', function(e){
  getCityName(e);
  clearScreen();
})

window.onload = () =>{
  showCurrentWeatherData('london');
  showForeCastWeatherData('london');
}