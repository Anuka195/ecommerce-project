import { fetchAllProductsOrProductDetails } from "/js/global/apis.js";

console.log("test home.js");

const products = await fetchAllProductsOrProductDetails(
  "https://dummyjson.com/products",
);

console.log(products);
