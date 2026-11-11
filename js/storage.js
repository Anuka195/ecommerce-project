export function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getData(key) {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : [];
}

export function removeData(key) {
  localStorage.removeItem(key);
}

export function clearStorage() {
  localStorage.clear();
}
