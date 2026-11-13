import { fetchAllProductsOrProductDetails } from "/js/global/apis.js";
import { STORAGE_KEYS } from "/js/global/constants.js";
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
  const { title, description, price, category, images } = data;
  const detailsImgUrl = images[0];
  /*   console.log(title, description, price, category, detailsImgUrl); */

  addFavoriteBtnEl.addEventListener("click", () => {
    const { id, title, description, price, images } = data;
    const imageUrl = images[0];

    addItemToStorage(FAVORITES_KEY, {
      id,
      title,
      description,
      price,
      imageUrl,
    });
  });

  addToCartBtnEl.addEventListener("click", () => {
    const { id, title, price, images } = data;
    const imageUrl = images[0];

    addItemToStorage(CART_KEY, { id, title, price, imageUrl });
  });
}

//render code from here
getDetailsData();
