import { fetchAllProductsOrProductDetails } from "/js/global/apis.js";

import { STORAGE_KEYS } from "./global/constants.js";
import { isItemInTheStorage } from "/js/global/crud.js";

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
      "https://dummyjson.com/products/?limit=20",
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
      // Check if the product is already in the cart storage
      if (!isItemInTheStorage(STORAGE_KEYS.CART_KEY, product.id)) {
        const productItemEl = document.createElement("li");

        productItemEl.innerHTML = `
        <div class="card-root-container">
          <div class="home-page_card-inner__container">
          <h3>${product.title}</h3>
            <img src="${product.images[0]}" alt="${product.title}" />
            <p>${product.description}</p>
            <p> <strong> $${product.price} Kr</strong></p>
          </div>
        </div>
        `;

        homePageProductsListEl.appendChild(productItemEl);
      }
    });
  } finally {
    homePageLoadingEl.style.display = "none";
  }
};

getAllProductsData();

toCatalogBtnEl.addEventListener("click", () => {
  window.location.href = "../pages/catalog.html";
});
