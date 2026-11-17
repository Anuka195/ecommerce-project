import { STORAGE_KEYS } from "./global/constants.js";

const { CART_KEY } = STORAGE_KEYS;

console.log("test checkout.js");

const checkout = JSON.parse(localStorage.getItem(CART_KEY) || "[]");


const checkoutProducts = document.getElementById("checkoutProducts");
const checkoutTotal = document.getElementById("checkoutTotal");
const buyButton = document.getElementById("buyButton");
const checkoutMessage = document.getElementById("checkoutMessage");

console.log(checkout);

if (checkout.length === 0) {
    checkoutProducts.textContent = "Din varukorg är tom.";
    buyButton.style.display = "none";
}

let totalPrice = 0;

checkout.forEach(function (product) {
    const productCard = document.createElement("div");

    const productName = document.createElement("h3")
    productName.textContent = product.title;

    const productPrice = document.createElement("p");
    productPrice.textContent = product.price + " kr";

    const productQuantity = document.createElement("p");
    productQuantity.textContent = "Antal: " + product.quantity;

    // Summa för produkten
    const productSumma = document.createElement("p");
    productSumma.textContent =
        "Summa: " + (product.price * product.quantity).toFixed(2) + " kr";

    const productImage = document.createElement("img");
    productImage.src = product.thm || product.imageUrl;
    productImage.alt = product.title;
    productImage.width = 150;

    productCard.append(productName,
        productPrice,
        productQuantity,
        productSumma,
        productImage
    );
    checkoutProducts.appendChild(productCard);

    totalPrice += product.price * product.quantity;
});

checkoutTotal.textContent =
    "Totalt att betala: " + totalPrice.toFixed(2) + " kr";

buyButton.addEventListener("click", function () {
    checkoutMessage.textContent = "🎉 Tack för ditt köp! Din beställning har genomförts.";

    localStorage.removeItem(CART_KEY);

    totalPrice = 0;

    checkoutTotal.textContent = "Totalt att betala: 0.00 kr";
    buyButton.style.display = "none";

    checkoutProducts.innerHTML = "";

    checkoutProducts.textContent = "Din varukorg är tom.";
});