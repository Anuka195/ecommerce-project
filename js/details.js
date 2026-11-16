import { fetchAllProductsOrProductDetails } from "/js/global/apis.js";
import { STORAGE_KEYS } from "/js/global/constants.js";
import { addItemToStorage, isItemInTheStorage } from "/js/global/crud.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const { CART_KEY, FAVORITES_KEY } = STORAGE_KEYS;

const detailsPageLoadingEl = document.querySelector("#detailsPageLoading");
const detailsPageContentEl = document.querySelector("#detailsPageContent");

const productTitleEl = document.querySelector("#detailsPageProductTitle");
const productCategoryEl = document.querySelector("#detailsPageProducCategory");
const productDescriptionEl = document.querySelector(
  "#detailsPageProductDescription",
);

const addFavoriteBtnEl = document.querySelector("#detailsPageAddFavoriteBtn");
const addToCartBtnEl = document.querySelector("#detailsPageAddToCartBtn");

const getDetailsData = async function () {
  let isLoading = true;

  isLoading && console.log("loading");
  detailsPageLoadingEl.style.display = isLoading ? "block" : "none";
  detailsPageLoadingEl.textContent = isLoading ? "Loading..." : "";

  detailsPageContentEl.style.display = isLoading ? "none" : "block";

  try {
    const resData = await fetchAllProductsOrProductDetails(
      "https://dummyjson.com/products/" + productId,
    );

    if (resData.errorMessage) {
      console.log(resData.errorMessage);
      isLoading = false;
      return;
    }

    renderDetails(resData.data);
  } finally {
    isLoading = false;
  }
};

function renderDetails(data) {
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
}

getDetailsData();

function updateButtonState(button, isDisabled) {
  button.disabled = isDisabled;
  button.style.opacity = isDisabled ? "0.8" : "1";
}
