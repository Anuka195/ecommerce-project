import { saveData, getData } from "./storage.js";

// ADD FAVORITE OR ITEM CART INTO LOCAL_STORAGE
export function addItem(key, item) {
  const items = getData(key);

  items.push(item);
  saveData(key, items);

  console.log("saved to storage");
}
