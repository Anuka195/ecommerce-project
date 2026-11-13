import { STORAGE_KEYS } from "./global/constants.js";

const { CART_KEY } = STORAGE_KEYS;

console.log("test cart.js");

const cartContent = document.getElementById("cartPageContent");

const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

console.log(cart);
let totalPrice = 0;

// Skapa ett element för hela varukorgens totalpris
const totalText = document.createElement("h3");

// Uppdatera totalpriset och spara varukorgen
function updateCart() {
  totalPrice = 0;

  cart.forEach(function (product) {
    totalPrice += product.price * 1;
  });

  totalText.textContent = "Totalt att betala: " + totalPrice + " kr";

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

if (cart.length === 0) {
  cartContent.textContent = "Du har inga produkter i varukorgen.";
} else {
  cart.forEach(function (product) {
    console.log(product.title);

    // Skapa produktkort
    const productCard = document.createElement("div");

    // Produktens namn
    const productName = document.createElement("h3");
    productName.textContent = product.title;

    // Produktens pris
    const productPrice = document.createElement("p");
    productPrice.textContent = product.price + " kr";

    // Produktens bild
    const productImage = document.createElement("img");
    productImage.src = product.thumbnail;
    productImage.alt = product.title;
    productImage.width = 150;

    // Antal produkter
    const productQuantity = document.createElement("p");
    productQuantity.textContent = "Antal: " + product.quantity;

    // Summa för produkten
    const productSumma = document.createElement("p");
    productSumma.textContent =
      "Summa: " + product.price * product.quantity + " kr";

    // Plusknapp
    const plusButton = document.createElement("button");
    plusButton.textContent = "+";

    plusButton.addEventListener("click", function () {
      product.quantity += 1;

      productQuantity.textContent = "Antal: " + product.quantity;

      productSumma.textContent =
        "Summa: " + product.price * product.quantity + " kr";

      updateCart();
    });

    // Minusknapp
    const minusButton = document.createElement("button");
    minusButton.textContent = "-";

    minusButton.addEventListener("click", function () {
      if (product.quantity > 1) {
        product.quantity -= 1;

        productQuantity.textContent = "Antal: " + product.quantity;

        productSumma.textContent =
          "Summa: " + product.price * product.quantity + " kr";

        updateCart();
      }
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "Ta bort";

    removeButton.addEventListener("click", function () {
      const productIndex = cart.findIndex(function (item) {
        return item.id === product.id;
      });

      if (productIndex !== -1) {
        cart.splice(productIndex, 1);
      }

      productCard.remove();

      updateCart();

      if (cart.length === 0) {
        cartContent.textContent = "Du har inga produkter i varukorgen.";
      }
    });

    productCard.append(
      productName,
      productPrice,
      productImage,
      productQuantity,
      productSumma,
      plusButton,
      minusButton,
      removeButton,
    );

    cartContent.appendChild(productCard);
  });

  cartContent.appendChild(totalText);

  updateCart();

  const checkoutButton = document.createElement("button");
  checkoutButton.textContent = "Till kassan";

  cartContent.appendChild(checkoutButton);

  checkoutButton.addEventListener("click", function () {
    window.location.href = "checkout.html";
  });
}
