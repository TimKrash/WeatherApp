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

  getCurrentIcon() {
    return this.current.weather[0].icon;
  }

  getTimezone() {
    return this.timezone;
  }

  getDewPoint() {
    return Math.round(this.current.dew_point);
  }

  getUvi() {
    return Math.ceil(this.current.uvi);
  }

  getPressure() {
    return Math.round(this.current.pressure);
  }

  getRainfall() {
    if (this.daily[0].rain) {
      return this.daily[0].rain["3h"];
    }
    return 0;
  }

  getSunset() {
    return new Date(this.current.sunset * 1000).toLocaleTimeString([], { timeZone: this.timezone, timeStyle: 'short' });
  }

  getSunrise() {
    return new Date(this.current.sunrise * 1000).toLocaleTimeString([], { timeZone: this.timezone, timeStyle: 'short' });
  }

  getDescription() {
    return formatLocation(this.current.weather[0].description);
  }

  getCurrentTemp() {
    return Math.round(this.current.temp);
  }

  getTodayLow() {
    return Math.round(this.daily[0].temp.min);
  }

  getTodayHigh() {
    return Math.round(this.daily[0].temp.max);
  }

  getFeelsLike() {
    return Math.round(this.current.feels_like);
  }

  getHumidity() {
    return this.current.humidity;
  }

  getChanceOfRain() {
    return this.daily[0].pop * 100;
  }

  getWindSpeed() {
    return Math.round(this.current.wind_speed);
  }

  getWindDegree() {
    return this.current.wind_deg;
  }
}
