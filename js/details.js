import { STORAGE_KEYS } from "/js/global/constants.js";
import { fetchAllProductsOrProductDetails } from "/js/global/apis.js";
import { addItemToStorage } from "/js/global/crud.js";

const { CART_KEY, FAVORITES_KEY } = STORAGE_KEYS;

const getProductDetailsData = async function () {
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
    if (resData.data) {
      console.log(resData.data);

      addItemToStorage(FAVORITES_KEY, resData.data);
    }
  } finally {
    isLoading = false;
  }
};

getProductDetailsData();
