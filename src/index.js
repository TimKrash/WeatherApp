import UI from './UI';
import Store from './Store';

window.addEventListener('DOMContentLoaded', UI.loadPage);

// Clear storage after 1/2 hour
let hours = 0.5;
let now = new Date().getTime();
let setupTime = Store.getItem('setupTime');
if (setupTime === null) {
  Store.setItem('setupTime', now);
} else {
  if (now - setupTime > hours * 60 * 60 * 1000) {
    Store.clearStore();
    Store.setItem('setupTime', now);
  }
}
