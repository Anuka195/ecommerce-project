import { saveData, getData } from "./storage.js";

// This global function add items to favorite and cart using the local storages keys and passing the item to be saved.
export function addItemToStorage(key, item) {
  const items = getData(key);

  items.push(item);
  saveData(key, items);

  console.log(`saved to storage: KEY=${key} ,item=`, item);
}
