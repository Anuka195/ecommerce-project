import { STORAGE_KEYS } from "/js/global/constants.js";
import { getAllProductsOrProductDetails } from "/js/global/apis.js";
import { addItem } from "/js/global/crud.js";

const { CART_KEY, FAVORITES_KEY } = STORAGE_KEYS;

const getProductData = async function () {
  let isLoading = true;

  isLoading && console.log("loading");

  try {
    const resData = await getAllProductsOrProductDetails(
      "https://dummyjson.com/products/1",
    );

    if (resData.errorMessage) {
      console.log(resData.errorMessage);
      isLoading = false;
      return;
    }
    if (resData.data) {
      console.log(resData.data);

      addItem(FAVORITES_KEY, resData.data);
    }
  } finally {
    isLoading = false;
  }
};

getProductData();
