import { formatLocation } from './Utils';

export default class Weather {
  constructor(name, state, country, timezone, current, daily, hourly) {
    this.current = {};
    this.daily = {};
    this.hourly = {};
    this.name = name;
    this.state = state;
    this.country = country;
    this.timezone = timezone;

    for (const [k, v] of Object.entries(current)) {
      this.current[k] = v;
    }

    for (const [k, v] of Object.entries(daily)) {
      this.daily[k] = v;
    }

    for (const [k, v] of Object.entries(hourly)) {
      this.hourly[k] = v;
    }
  }

  getName() {
    return this.name;
  }

  getState() {
    return this.state;
  }

  getCountry() {
    return this.country;
  }

  getTimezone() {
    return this.timezone;
  }

  getUvi() {
    return this.current.uvi;
  }

  getPressure() {
    return this.current.pressure;
  }

  getRainfall() {
    return this.daily[0].rain;
  }

  getSunset() {
    return this.current.sunset;
  }

  getDescription() {
    return formatLocation(this.current.weather[0].description);
  }

  getCurrentTemp() {
    return this.current.temp;
  }

  getTodayLow() {
    return this.daily[0].temp.min;
  }

  getTodayHigh() {
    return this.daily[0].temp.max;
  }

  getFeelsLike() {
    return this.current.feels_like;
  }

  getHumidity() {
    return this.current.humidity;
  }

  getChanceOfRain() {
    return this.daily[0].pop;
  }

  getWindSpeed() {
    return this.current.wind_speed;
  }
}
