const globalURL = "http://api.openweathermap.org/";

function GeocoderURL(city, limit, key) {
  return globalURL + "geo/1.0/direct?q=" + city + "&limit=" + limit + "&appid=" + key;
}

function WeatherURL(lat, lon, units, key) {
  return globalURL + "data/3.0/onecall?lat=" + lat + "&lon=" + lon +  "&units=" + units + "&appid=" + key;
}

function formatLocation(location) {
  // Format any extra spaces
  const noExtraSpace = location.replace(/\s+/g, ' ').trim();

  // Each first word has a capital first letter
  const words = noExtraSpace.split(' ');

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(' ');
}

export { GeocoderURL, WeatherURL, formatLocation };
