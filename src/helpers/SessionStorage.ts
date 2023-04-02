export class SessionStorage {
  setData(key: string, value: string) {
    // Suport Local Storage
    if (typeof Storage !== 'undefined') {
      sessionStorage.setItem(key, value);
    }
  }

  getData(key: string) {
    return sessionStorage.getItem(key);
  }

  deleteData(key: string) {
    sessionStorage.removeItem(key);
  }
}
