import Weather from './Weather';
import Store from './Store';
import { GeocoderURL, WeatherURL } from './Utils';

class APIService {
  constructor() {
    this.key = process.env.API_KEY;
  }

  // Error handler util //
  errorHandler(fn) {
    return (...params) => {
      return fn(...params).catch((err) => console.log("Oops!", err));
    }
  }

  async createNewWeatherObject(location) {
    let cityWeather = Store.getItem(location);
    // Todo remove this + Store -- for use while developing only
    if (cityWeather) {
      cityWeather = JSON.parse(cityWeather);
      const targetWeather = new Weather(cityWeather.name, cityWeather.state, cityWeather.country,
        cityWeather.timezone, cityWeather.current, cityWeather.daily, cityWeather.hourly);

      return targetWeather;
    }

    const geoCoderUrl = GeocoderURL(location, 1, this.key);

    const getLocationInfo = this.errorHandler(this.getLocationInfo);
    const info = await getLocationInfo(geoCoderUrl);

    const getWeatherData = this.errorHandler(this.getWeatherData);
    const data = await getWeatherData(info.lat, info.lon, "imperial", this.key);

    const weatherObject = new Weather(info.name, info.state, info.country, data.timezone, data.current, data.daily, data.hourly);
    Store.setItem(location, JSON.stringify(weatherObject));

    return weatherObject;
  }

  async getWeatherData(lat, lon, units, key) {
    const weatherUrl = WeatherURL(lat, lon, units, key);
    const rawResponse = await fetch(weatherUrl, { mode: 'cors' });
    const response = await rawResponse.json();

    return response;
  }

  async getLocationInfo(endpoint) {
    const rawResponse = await fetch(endpoint, { mode: 'cors' });
    const response = await rawResponse.json();

    return { 'lat': response[0].lat.toString(),
      'lon': response[0].lon.toString(),
      'name': response[0].name,
      'state': response[0].state,
      'country': response[0].country};
  }
}

export default (new APIService);
