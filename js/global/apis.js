import { timeOutTest } from "./utils.js";

let errorMessage = null;
let data = null;

export async function getAllProductsOrProductDetails(url) {
  errorMessage = null;
  data = null;

  try {
    await timeOutTest(2000);

    const res = await fetch(url);
    data = await res.json();
  } catch (error) {
    errorMessage = error.message;
  }

  return { data, errorMessage };
}
