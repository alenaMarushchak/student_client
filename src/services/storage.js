// Only for json`s
class Storage {
  set(item, json) {
    try {
      const data = JSON.stringify(json);
      localStorage.setItem(item, data);
      return true;
    } catch (e) {
      return false;
    }
  }

  get(item) {
    try {
      const data = localStorage.getItem(item);
      return JSON.parse(data);
    } catch (e) {
      return {}
    }
  }

}
export default (new Storage())
