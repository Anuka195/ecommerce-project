import { fetchAllProductsOrProductDetails } from "/js/global/apis.js";
import { STORAGE_KEYS } from "/js/global/constants.js";
import { addItemToStorage, isItemInTheStorage } from "/js/global/crud.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const { CART_KEY, FAVORITES_KEY } = STORAGE_KEYS;

const detailsPageLoadingEl = document.querySelector("#detailsPageLoading");
const detailsPageMessagesEl = document.querySelector("#detailsPageMessages");
const detailsPageContentEl = document.querySelector("#detailsPageContent");

const productTitleEl = document.querySelector("#detailsPageProductTitle");
const productCategoryEl = document.querySelector("#detailsPageProductCategory");
const productDescriptionEl = document.querySelector(
  "#detailsPageProductDescription",
);

const addFavoriteBtnEl = document.querySelector("#detailsPageAddFavoriteBtn");
const addToCartBtnEl = document.querySelector("#detailsPageAddToCartBtn");

const backBtnEl = document.querySelector("#detailsPageBackBtn");

const getDetailsData = async function () {
  let isLoading = true;

  detailsPageLoadingEl.style.display = isLoading ? "block" : "none";
  detailsPageLoadingEl.textContent = isLoading ? "Loading..." : "";

  detailsPageContentEl.style.display = isLoading ? "none" : "block";

  try {
    const resData = await fetchAllProductsOrProductDetails(
      "https://dummyjson.com/products/" + productId,
    );

    if (resData.errorMessage) {
      detailsPageMessagesEl.textContent =
        "An Error As Occurred" + resData.errorMessage;
      detailsPageLoadingEl.style.display = "none";
      isLoading = false;
      return;
    }

    renderDetailsPageContent(resData.data);
  } finally {
    isLoading = false;
  }
};

function renderDetailsPageContent(data) {
  detailsPageLoadingEl.textContent = "";
  detailsPageContentEl.style.display = "block";

  const { id, title, description, price, category, images } = data;
  const detailsImgUrl = images[0];

  const isOnFavoriteList = isItemInTheStorage(FAVORITES_KEY, id);
  const isOnCartList = isItemInTheStorage(CART_KEY, id);

  updateButtonState(addFavoriteBtnEl, isOnFavoriteList);
  updateButtonState(addToCartBtnEl, isOnCartList);

  productTitleEl.textContent = title;
  productCategoryEl.textContent = category;
  productDescriptionEl.textContent = description;

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
  button.style.opacity = isDisabled ? "0.8" : "1";
}
