import { getAllProductsOrProductDetails } from "/js/global/apis.js";

console.log("test home.js");

const products = await getAllProductsOrProductDetails(
  "https://dummyjson.com/products",
);

console.log(products);
