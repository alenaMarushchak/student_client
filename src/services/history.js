import { createBrowserHistory } from 'history';

let instance = null;

class History {
  generateHistory() {
    if (!instance)
      instance = createBrowserHistory();
    return instance;
  }
}

export default (new History());
