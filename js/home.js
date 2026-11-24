import { STORAGE_KEYS } from "./global/constants.js";
import { isItemInTheStorage } from "./global/crud.js";
import { timeOutTest } from "./global/utils.js";

const homePageLoadingEl = document.querySelector(".spinner-container");
const homePageMessagesEl = document.querySelector(".messages-container");

const homePageContentEl = document.querySelector("#homePageContent");

const toCatalogBtnEl = document.querySelector("#homePageToCatalogBtn");
const homePageProductsListEl = document.querySelector("#homePageProductsList");

const getRelatedProducts = async function () {
  homePageLoadingEl.style.display = "block";
  homePageContentEl.style.display = "none";

  try {
    await timeOutTest(1000);
    const res = await fetch("https://dummyjson.com/products/?limit=20");

    if (!res.ok) {
      throw new Error("Failed to fetch product details");
    }

    const data = await res.json();
    const products = data.products;

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
  } catch (e) {
    homePageMessagesEl.classList.add("error-message");
    homePageMessagesEl.textContent = "An Error As Occurred:";
  } finally {
    homePageLoadingEl.style.display = "none";
  }
};

getRelatedProducts();

toCatalogBtnEl.addEventListener("click", () => {
  window.location.href = "./pages/catalog.html";
});
