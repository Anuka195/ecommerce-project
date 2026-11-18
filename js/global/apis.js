import { timeOutTest } from "./utils.js";

export async function fetchAllProductsOrProductDetails(url) {
  let errorMessage = null;
  let data = null;

  try {
    await timeOutTest(2000);

    const res = await fetch(url);
    data = await res.json();
  } catch (error) {
    errorMessage = error.message;
  }

  return { data, errorMessage };
}
