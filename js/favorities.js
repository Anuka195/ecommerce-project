import { STORAGE_KEYS } from "./global/constants.js";

const { FAVORITES_KEY } = STORAGE_KEYS

console.log(STORAGE_KEYS.CART_KEY)

console.log("test favorites.js");

const favoritesContent = document.getElementById("favoritesPageContent");

const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");

if (favorites.length === 0) {
    favoritesContent.textContent = "Du har inga favoriter ännu.";
} else {
    favorites.forEach(function (product) {
        const productCard = document.createElement("div");
        productCard.classList.add("card-root-container");

        const innerContainer = document.createElement("div");
        innerContainer.classList.add("favorites__inner");

        const productName = document.createElement("h3");
        productName.textContent = product.title;

        const productPrice = document.createElement("p");
        productPrice.textContent = product.price + " kr";

        const productImage = document.createElement("img");
        productImage.src = product.imageUrl;
        productImage.alt = product.title;
        productImage.width = 150;
        productImage.classList.add("favorites__image");

        const removeButton = document.createElement("button");
        removeButton.textContent = "Ta bort favorit";
        removeButton.classList.add("favorites__remove-button", "card-buttons");

        removeButton.addEventListener("click", () => {
            console.log("Favorit borttagen");

            const updatedFavorites = JSON.parse(
                localStorage.getItem(FAVORITES_KEY) || "[]"
            ).filter(item => item.id !== product.id);

            localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));

            productCard.remove();

            if (updatedFavorites.length === 0) {
                favoritesContent.textContent = "Du har inga favoriter ännu.";
            }
        });
        innerContainer.append(
            productName,
            productPrice,
            productImage,
            removeButton
        );

        productCard.appendChild(innerContainer);
        favoritesContent.appendChild(productCard);

    });
}

