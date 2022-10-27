class Store {
  constructor() {
    this.localStorage = window.localStorage;
  }

  setItem(k, v) {
    this.localStorage.setItem(k, v);
  }

  getItem(k) {
    return this.localStorage.getItem(k);
  }

  clearStore() {
    this.localStorage.clear();
  }
}

export default (new Store);
