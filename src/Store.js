class Store {
  constructor() {
    this.localStorage = window.localStorage;
    this.localStorage.clear();
  }

  setItem(k, v) {
    this.localStorage.setItem(k, v);
  }

  getItem(k) {
    return this.localStorage.getItem(k);
  }
}

export default (new Store);
