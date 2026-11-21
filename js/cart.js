
import { STORAGE_KEYS } from "./global/constants.js";

const { CART_KEY } = STORAGE_KEYS;

console.log("test cart.js");

const cartContent = document.getElementById("cartPageContent");

const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

console.log(cart);

let totalPrice = 0;

// Skapa ett element för hela varukorgens totalpris
const totalText = document.createElement("h3");
totalText.classList.add("cart__total");

// Uppdatera totalpriset och spara varukorgen
function updateCart() {
    totalPrice = 0;

    cart.forEach(function (product) {
        totalPrice += product.price * product.quantity;
    });

    totalText.textContent =
        "Totalt att betala: " + totalPrice.toFixed(2) + " kr";

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

if (cart.length === 0) {
    cartContent.textContent = "Du har inga produkter i varukorgen.";
} else {
    cart.forEach(function (product) {
        console.log(product.title);

        product.quantity = product.quantity ?? 1;

        // Skapa produktkort
        const productCard = document.createElement("div");
        productCard.classList.add("card-root-container");
        productCard.classList.add("cart__card");

        // Produktens namn
        const productName = document.createElement("h3");
        productName.textContent = product.title;

        // Produktens pris
        const productPrice = document.createElement("p");
        productPrice.textContent = product.price + " kr";

        // Produktens bild
        const productImage = document.createElement("img");
        productImage.src = product.thm || product.imageUrl;
        productImage.alt = product.title;
        productImage.classList.add("cart__image");

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
        plusButton.classList.add("cart__quantity-button", "card-buttons");

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
        minusButton.classList.add("cart__quantity-button", "card-buttons");

        minusButton.addEventListener("click", function () {
            if (product.quantity > 1) {
                product.quantity -= 1;

                productQuantity.textContent = "Antal: " + product.quantity;

                productSumma.textContent =
                    "Summa: " + product.price * product.quantity + " kr";

                updateCart();
            }
        });

        // Gemensam behållare för plus- och minusknapparna
        const quantityButtons = document.createElement("div");
        quantityButtons.classList.add("cart__quantity-buttons");

        quantityButtons.append(plusButton, minusButton);

        // Ta bort-knapp
        const removeButton = document.createElement("button");
        removeButton.textContent = "Ta bort";
        removeButton.classList.add("cart__remove-button", "card-buttons");

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
                cartContent.textContent =
                    "Du har inga produkter i varukorgen.";
            }
        });

        // Lägg till innehållet i produktkortet
        productCard.append(
            productName,
            productPrice,
            productImage,
            productQuantity,
            productSumma,
            quantityButtons,
            removeButton
        );

        cartContent.appendChild(productCard);
    });

    updateCart();

    // Till kassan-knapp
    const checkoutButton = document.createElement("button");
    checkoutButton.textContent = "Till kassan";
    checkoutButton.classList.add("cart__checkout-button");

    // Behållare för totalpris och kassaknapp
    const cartSummary = document.createElement("div");
    cartSummary.classList.add("cart__summary");

    cartSummary.append(totalText, checkoutButton);
    cartContent.appendChild(cartSummary);

    checkoutButton.addEventListener("click", function () {
        window.location.href = "checkout.html";
    });
}

