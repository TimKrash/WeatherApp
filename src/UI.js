import './style.css';
import APIService from './APIService';
import { formatLocation, imperialMap, getDay } from './Utils';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

class UI {
  constructor() {
    this.city = null;
    this.loadPage = this.loadPage.bind(this);
    this.toggleTimeframe = this.toggleTimeframe.bind(this);
    this.daily = true;
    this.isImperial = true;
  }

  getTempDelimiter() {
    return " \u00B0" + imperialMap[this.isImperial].tempUnit;
  }

  getPressureDelimiter() {
    return imperialMap[this.isImperial].pressureUnit;
  }

  getSpeedDelimiter() {
    return imperialMap[this.isImperial].speedUnit;
  }

  timer() {
    setTimeout((timezone) => {
      const d = new Date();
      const n = d.toLocaleTimeString("en-US", { timeZone: timezone });
      document.querySelector(".main-time").innerHTML = n;
      this.timer();
    }, 1000, this.city.getTimezone())
  }

  loadPage() {
    this.addEventListeners();
  }

  async loadWeather(formValues) {
    // todo handle to make sure correct city
    const rawLocation = formValues[0];
    const location = formatLocation(rawLocation);

    // todo add loader css
    this.city = await APIService.createNewWeatherObject(location);
    console.log(this.city);

    this.loadSections();
  }

  loadSections() {
    this.loadWeatherMainInfo();
    this.loadWeatherItems();
    this.loadDailyForecast();
  }

  loadWeatherMainInfo() {
    const weatherMainInfo = document.querySelector(".weather-main-info");
    const name = weatherMainInfo.querySelector("h1");
    name.textContent = this.city.getName() + ", " + this.city.getState();

    // run timer
    const time = document.querySelector(".main-time");
    const timezone = this.city.getTimezone();
    time.textContent = new Date().toLocaleTimeString("en-US", { timeZone: timezone})
    this.timer();

    const currTemp = weatherMainInfo.querySelector(".main-temp");
    currTemp.textContent = this.city.getCurrentTemp() + this.getTempDelimiter();

    const description = weatherMainInfo.querySelector(".main-desc");
    description.textContent = this.city.getDescription();

    const highTemp = weatherMainInfo.querySelector(".high-low > .high");
    highTemp.textContent = this.city.getTodayHigh() + this.getTempDelimiter();

    const lowTemp = weatherMainInfo.querySelector(".high-low > .low");
    lowTemp.textContent = this.city.getTodayLow() + this.getTempDelimiter();
  }

  loadWeatherItems() {
    const weatherItems = document.querySelectorAll(".weather-item");
    weatherItems.forEach(weatherItem => {
      const classList = weatherItem.classList;
      const dataItem = weatherItem.querySelector(".content");
      const subContent = weatherItem.querySelector(".sub-content");

      if (classList.contains("uvi")) {
        dataItem.textContent = this.city.getUvi();
      } else if (classList.contains("feels-like")) {
        dataItem.textContent = this.city.getFeelsLike() + this.getTempDelimiter();
      } else if (classList.contains("humidity")) {
        dataItem.textContent = this.city.getHumidity() + "%";
      } else if (classList.contains("chance-of-rain")) {
        dataItem.textContent = this.city.getChanceOfRain() + "%";
      } else if (classList.contains("wind-speed")) {
        dataItem.textContent = this.city.getWindSpeed() + this.getSpeedDelimiter();
      } else if (classList.contains("sunset")) {
        dataItem.textContent = this.city.getSunset();
      } else if (classList.contains("rainfall")) {
        const rainFall = this.city.getRainfall();
        if (rainFall !== undefined) {
          dataItem.textContent = rainFall + "mm";
        } else {
          dataItem.textContent = "0mm";
        }
      } else if (classList.contains("pressure")) {
        dataItem.textContent = this.city.getPressure() + this.getPressureDelimiter();
      }
    });
  }

  loadHourlyForecast() {
    const timeItemContainer = document.querySelector(".time-item-container");
  }

  loadDailyForecast() {
    const timeItemContainer = document.querySelector(".time-item-container");
    timeItemContainer.innerHTML = "";

    const dailyForecasts = this.city.daily;
    for (const i in dailyForecasts) {
      let idx = parseInt(i);
      if (idx === 0) {
        continue;
      }

      const timeItem = document.createElement('div');
      timeItem.classList.add("time-item");

      const time = document.createElement('div');
      time.classList.add("time");
      time.textContent = getDay(this.city.getTimezone(), idx);

      const timeWeatherContent = document.createElement('div');
      timeWeatherContent.classList.add("time-weather-content");

      const tempContent = document.createElement('div');
      tempContent.classList.add("temp-content");

      const highTemp = document.createElement('div');
      highTemp.classList.add("high-temp");
      highTemp.textContent = dailyForecasts[idx].temp.max + this.getTempDelimiter();

      const lowTemp = document.createElement('div');
      lowTemp.classList.add("low-temp");
      lowTemp.textContent = dailyForecasts[idx].temp.min + this.getTempDelimiter();

      tempContent.append(highTemp, lowTemp);

      const weatherIcon = document.createElement('div');
      weatherIcon.classList.add("icon");
      weatherIcon.textContent = "Test";

      timeWeatherContent.append(tempContent, weatherIcon);
      timeItem.append(time, timeWeatherContent);

      timeItemContainer.append(timeItem);
    }
  }

  toggleTimeframe(event) {
    if (event.pointerId === -1) {
      return;
    }

    if (this.daily) {
      this.loadHourlyForecast();
    } else {
      this.loadDailyForecast();
    }

    this.daily = !this.daily;
  }

  addEventListeners() {
    const form = document.querySelector("form");
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const values = [...formData.values()];
      this.loadWeather(values);
    });

    const dailyToggle = document.querySelector(".time-selector");
    dailyToggle.addEventListener('click', this.toggleTimeframe)
  }
}

export default (new UI);
