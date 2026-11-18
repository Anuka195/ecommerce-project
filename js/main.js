import { fetchAllProductsOrProductDetails } from "/js/global/apis.js";

const homePageLoadingEl = document.querySelector(".spinner-container");
const homePageMessagesEl = document.querySelector(".messages-container");

const homePageContentEl = document.querySelector("#homePageContent");

const toCatalogBtnEl = document.querySelector("#homePageToCatalogBtn");
const homePageProductsListEl = document.querySelector("#homePageProductsList");

const getAllProductsData = async function () {
  homePageLoadingEl.style.display = "block";
  homePageContentEl.style.display = "none";

  try {
    const resData = await fetchAllProductsOrProductDetails(
      "https://dummyjson.com/products",
    );

    if (resData.errorMessage) {
      homePageLoadingEl.style.display = "none";
      homePageMessagesEl.classList.add("error-message");
      homePageMessagesEl.textContent = "An Error As Occurred:";
      return;
    }
    const products = resData.data.products;

    homePageContentEl.style.display = "block";

    products.forEach((product) => {
      const productItemEl = document.createElement("li");
      productItemEl.textContent = product.title;
      homePageProductsListEl.appendChild(productItemEl);
    });
  } finally {
    homePageLoadingEl.style.display = "none";
  }
};

getAllProductsData();

toCatalogBtnEl.addEventListener("click", () => {
  window.location.href = "../pages/catalog.html";
});
