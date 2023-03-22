import './style.css'

async function getCurrentWeatherData(city='london'){
  const resp = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=b00ef59dc62e4d45bcf61559232003&q=${city}&aqi=yes`
  );
  const respJson = await resp.json();
  return respJson;
}

async function trimCurrentData(respJson){

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

  console.log(resp);
  console.log(tempInC);
  console.log(tempInF);
  console.log(lastUpdated);
  console.log(feelsLikeC);
  console.log(feelsLikeF);
  console.log(country, city);
  console.log(condition);
  console.log(windDir, windKph, windMph)
  console.log(cloud);

}

function getCityName(event){
  event.preventDefault();
  const city = document.getElementById('cityName');
  const currentData = getCurrentWeatherData(city.value);
  trimCurrentData(currentData);
  city.value = '';
}

const form = document.getElementById('form');
form.addEventListener('submit', function(e){
  getCityName(e);
})