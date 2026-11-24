import { STORAGE_KEYS } from "./global/constants.js";
import { addItemToStorage, isItemInTheStorage } from "./global/crud.js";
import { timeOutTest } from "./global/utils.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const { CART_KEY, FAVORITES_KEY } = STORAGE_KEYS;

const detailsPageLoadingEl = document.querySelector(".spinner-container");
const detailsPageMessagesEl = document.querySelector(".messages-container");
const detailsPageContentEl = document.querySelector("#detailsPageContent");
const productTitleEl = document.querySelector("#detailsPageProductTitle");
const productImageEl = document.querySelector("#detailsPageProductImage");
const productDescriptionEl = document.querySelector(
  "#detailsPageProductDescription",
);
const extraInfoContainerEl = document.querySelector(
  ".details-page_extra-info__container",
);

const priceTextEl = document.querySelector("#detailsPagePrice");
const addFavoriteBtnEl = document.querySelector("#detailsPageAddFavoriteBtn");
const addToCartBtnEl = document.querySelector("#detailsPageAddToCartBtn");
const backBtnEl = document.querySelector("#detailsPageBackBtn");

const getDetailsData = async function () {
  detailsPageLoadingEl.style.display = "block";
  detailsPageContentEl.style.display = "none";
  try {
    await timeOutTest(1000);
    const res = await fetch("https://dummyjson.com/products/" + productId);

    if (!res.ok) {
      throw new Error("Failed to fetch product details");
    }

    const data = await res.json();

    renderDetailsPageContent(data);
  } catch (e) {
    detailsPageMessagesEl.classList.add("error-message");
    detailsPageMessagesEl.textContent = "An Error As Occurred";
  } finally {
    detailsPageLoadingEl.style.display = "none";
  }
};

function renderDetailsPageContent(data) {
  detailsPageContentEl.style.display = "flex";

  const { id, title, description, price, stock, category, images } = data;
  const detailsImgUrl = images[0];

  const isOnFavoriteList = isItemInTheStorage(FAVORITES_KEY, id);
  const isOnCartList = isItemInTheStorage(CART_KEY, id);

  updateButtonState(addFavoriteBtnEl, isOnFavoriteList);
  updateButtonState(addToCartBtnEl, isOnCartList);

  productTitleEl.textContent = title;

  productImageEl.src = detailsImgUrl;
  productImageEl.alt = title;

  productDescriptionEl.textContent = description;

  extraInfoContainerEl.innerHTML = `
    <p> Category: <strong>${category}</strong></p>
    <p>In Stock: <strong>${stock}</strong></p>
  `;

  priceTextEl.innerHTML = `<strong>${price} Kr</strong>`;

  addFavoriteBtnEl.addEventListener("click", () => {
    const { images } = data;
    const imageUrl = images[0];

    if (isItemInTheStorage(FAVORITES_KEY, id)) return;

    addItemToStorage(FAVORITES_KEY, {
      id,
      title,
      description,
      price,
      imageUrl,
    });

    updateButtonState(addFavoriteBtnEl, true);
  });

  addToCartBtnEl.addEventListener("click", () => {
    const { images } = data;
    const imageUrl = images[0];

    if (isItemInTheStorage(CART_KEY, id)) return;

    addItemToStorage(CART_KEY, { id, title, price, imageUrl });

    updateButtonState(addToCartBtnEl, true);
  });

  backBtnEl.addEventListener("click", () => {
    window.location.href = "./catalog.html";
  });
}

getDetailsData();

function updateButtonState(button, isDisabled) {
  button.disabled = isDisabled;
  button.style.opacity = isDisabled ? "0.5" : "1";
}
