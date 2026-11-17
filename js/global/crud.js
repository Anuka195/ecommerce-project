import { saveData, getData } from "./storage.js";

// This global function add items to favorite and cart using the local storages keys and passing the item to be saved.
export function addItemToStorage(key, item) {
  const items = getData(key);

  items.push(item);
  saveData(key, items);

  console.log(`saved to storage: KEY=${key} ,item=`, item);
}

//checks if an item is already in the storage list by checking the id of the item and returns a bolean
export function isItemInTheStorage(key, id) {
  const items = getData(key) || [];

  return items.some((item) => item.id === id);
}
