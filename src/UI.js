import './style.css';
import APIService from './APIService';
import { formatLocation } from './Utils';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

class UI {
  constructor() {
    this.city = null;
    this.loadPage = this.loadPage.bind(this);
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
  }

  loadWeatherMainInfo() {
    const weatherMainInfo = document.querySelector(".weather-main-info");
    const name = weatherMainInfo.querySelector("h1");
    name.textContent = this.city.getName() + ", " + this.city.getState();

    const currTemp = weatherMainInfo.querySelector(".temperature");
    currTemp.textContent = this.city.getCurrentTemp();

    const description = weatherMainInfo.querySelector(".description");
    description.textContent = this.city.getDescription();

    const highTemp = weatherMainInfo.querySelector(".high-low > .high");
    highTemp.textContent = this.city.getTodayHigh();

    const lowTemp = weatherMainInfo.querySelector(".high-low > .low");
    lowTemp.textContent = this.city.getTodayLow();
  }

  loadWeatherItems() {
    const weatherItems = document.querySelectorAll(".weather-item");
    weatherItems.forEach(weatherItem => {
      const classList = weatherItem.classList;
      const dataItem = weatherItem.querySelector(".content");

      if (classList.contains("uvi")) {
        dataItem.textContent = this.city.getUvi();
      } else if (classList.contains("feels-like")) {
        dataItem.textContent = this.city.getFeelsLike();
      } else if (classList.contains("humidity")) {
        dataItem.textContent = this.city.getHumidity();
      } else if (classList.contains("chance-of-rain")) {
        dataItem.textContent = this.city.getChanceOfRain();
      } else if (classList.contains("wind-speed")) {
        dataItem.textContent = this.city.getWindSpeed();
      } else if (classList.contains("sunset")) {
        dataItem.textContent = this.city.getSunset();
      } else if (classList.contains("rainfall")) {
        dataItem.textContent = this.city.getRainfall();
      } else if (classList.contains("pressure")) {
        dataItem.textContent = this.city.getPressure();
      }
    });
  }

  addEventListeners() {
    const form = document.querySelector("form");
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const values = [...formData.values()];
      this.loadWeather(values);
    })
  }
}

export default (new UI);
