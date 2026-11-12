import { fetchAllProductsOrProductDetails } from "/js/global/apis.js";

const toCatalogBtnEl = document.querySelector("#homePageToCatalogBtn");

const getAllProductsData = async function () {
  let isLoading = true;

  isLoading && console.log("loading");

  try {
    const resData = await fetchAllProductsOrProductDetails(
      "https://dummyjson.com/products",
    );

    if (resData.errorMessage) {
      console.log(resData.errorMessage);
      isLoading = false;
      return;
    }
    const products = resData.data;
    console.log(products);
  } finally {
    isLoading = false;
  }
};

getAllProductsData();

toCatalogBtnEl.addEventListener("click", () => {
  window.location.href = "../pages/catalog.html";
});
