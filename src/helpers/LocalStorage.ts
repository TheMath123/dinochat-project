export class LocalStorage {
  setData(key: string, value: string) {
    // Suport Local Storage
    if (typeof Storage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  getData(key: string) {
    return localStorage.getItem(key);
  }

  deleteData(key: string) {
    localStorage.removeItem(key);
  }
}
