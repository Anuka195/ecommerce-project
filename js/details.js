import { STORAGE_KEYS } from "/js/constants.js";
import { getAllProductsOrProductDetails } from "/js/apis.js";
import { addItem } from "/js/crud.js";

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

      addItem(STORAGE_KEYS.FAVORITE_LIST_ST_KEY, resData.data);
    }
  } finally {
    isLoading = false;
  }
};

getProductData();
