import { getAllProductsOrProductDetails } from "/js/apis.js";

console.log("test home.js");

const products = await getAllProductsOrProductDetails(
  "https://dummyjson.com/products",
);

console.log(products);
