import { STORAGE_KEYS } from "./global/constants.js";

const {FAVORITES_KEY}= STORAGE_KEYS

console.log(STORAGE_KEYS.CART_KEY)

console.log("test favorites.js");

const favoritesContent = document.getElementById("favoritesPageContent");

const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");

if (favorites.length === 0) {
    favoritesContent.textContent = "Du har inga favoriter ännu.";
} else {
    favorites.forEach(function (product) {
        const productCard = document.createElement("div");

        const productName = document.createElement("h3");
        productName.textContent = product.title;

        const productPrice = document.createElement("p");
        productPrice.textContent = product.price + " kr";

        const productImage = document.createElement("img");
        productImage.src = product.thumbnail;
        productImage.alt = product.title;
        productImage.width = 150;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Ta bort favorit";

        removeButton.addEventListener("click", () => {
            console.log("Favorit borttagen");

            const updatedFavorites = JSON.parse(
                localStorage.getItem("favorites") || "[]"
            ).filter(item => item.id !== product.id);

            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

            productCard.remove();

            if (updatedFavorites.length === 0) {
                favoritesContent.textContent = "Du har inga favoriter ännu.";
            }
        });
productCard.append(productName, productPrice, productImage, removeButton);
        favoritesContent.appendChild(productCard);
        
    });
}

