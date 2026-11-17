import { fetchAllProductsOrProductDetails } from "/js/global/apis.js";

const homePageLoadingEl = document.querySelector("#homePageLoading");
const homePageMessagesEl = document.querySelector("#homePageMessages");

const homePageContentEl = document.querySelector("#homePageContent");

const toCatalogBtnEl = document.querySelector("#homePageToCatalogBtn");
const homePageProductsListEl = document.querySelector("#homePageProductsList");

const getAllProductsData = async function () {
  let isLoading = true;

  homePageLoadingEl.style.display = isLoading ? "block" : "none";
  homePageLoadingEl.textContent = isLoading ? "Loading..." : "";

  homePageContentEl.style.display = isLoading ? "none" : "block";

  try {
    const resData = await fetchAllProductsOrProductDetails(
      "https://dummyjson.com/products",
    );

    if (resData.errorMessage) {
      /* console.log(resData.errorMessage); */
      homePageMessagesEl.textContent =
        "An Error As Occurred:" + resData.errorMessage;
      homePageLoadingEl.style.display = "none";
      isLoading = false;
      return;
    }
    const products = resData.data.products;
    /*   console.log(products); */

    homePageLoadingEl.textContent = "";
    homePageContentEl.style.display = "block";

    products.forEach((product) => {
      const productItemEl = document.createElement("li");
      productItemEl.textContent = product.title;
      homePageProductsListEl.appendChild(productItemEl);
    });
  } finally {
    isLoading = false;
  }
};

getAllProductsData();

toCatalogBtnEl.addEventListener("click", () => {
  window.location.href = "../pages/catalog.html";
});
