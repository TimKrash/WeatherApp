import './style.css';
import APIService from './APIService';
import { formatLocation } from './Utils';

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
    const weatherLocation = document.querySelector(".weather-location > h1");
    weatherLocation.textContent = this.city.name + ", " + this.city.state;

    // todo current time
    this.loadWeatherItems();
  }

  loadWeatherItems() {
    const weatherItems = document.querySelectorAll(".weather-item");
    weatherItems.forEach(weatherItem => {
      const classList = weatherItem.classList;
      const dataItem = weatherItem.querySelector("span");

      if (classList.contains("description")) {
        // todo weather icon
        dataItem.textContent = this.city.getDescription();
      } else if (classList.contains("current-temp")) {
        dataItem.textContent = this.city.getCurrentTemp();
      } else if (classList.contains("feels-like")) {
        dataItem.textContent = this.city.getFeelsLike();
      } else if (classList.contains("humidity")) {
        dataItem.textContent = this.city.getHumidity();
      } else if (classList.contains("chance-of-rain")) {
        dataItem.textContent = this.city.getChanceOfRain();
      } else if (classList.contains("wind-speed")) {
        dataItem.textContent = this.city.getWindSpeed();
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
