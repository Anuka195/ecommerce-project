import { STORAGE_KEYS } from "/js/global/constants.js";
import { fetchAllProductsOrProductDetails } from "/js/global/apis.js";
import { addItemToStorage } from "/js/global/crud.js";

const addFavoriteBtnEl = document.querySelector("#detailsPageAddFavoriteBtn");
const addToCartBtnEl = document.querySelector("#detailsPageAddToCartBtn");

const { CART_KEY, FAVORITES_KEY } = STORAGE_KEYS;

const getDetailsData = async function () {
  let isLoading = true;

  isLoading && console.log("loading");

  try {
    const resData = await fetchAllProductsOrProductDetails(
      "https://dummyjson.com/products/1",
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
  const { title, description, pris, category, thumbnail } = data;
  /* console.log(title, description, pris, category, thumbnail); */

  addFavoriteBtnEl.addEventListener("click", () => {
    addToFavoriteList(data);
  });

  addToCartBtnEl.addEventListener("click", () => {
    addToCartList(data);
  });
}

function addToCartList(data) {
  const { id, title, pris } = data;
  addItemToStorage(CART_KEY, { id, title, pris });
}

function addToFavoriteList(data) {
  const { id, title, description, price } = data;
  addItemToStorage(FAVORITES_KEY, { id, title, description, price });
}

//render code from here
getDetailsData();
