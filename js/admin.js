const dropdown = document.getElementById("filterDropDown");
const sortDropdown = document.getElementById("sortDropDown");
const adminPageContent = document.getElementById("adminPageContent");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const productsUrl = 'https://dummyjson.com/products'
const addProductBtn = document.getElementById("addProductBtn");
const addProduct = document.getElementById("addProduct");
const addProductForm = document.getElementById("addProductForm");
const cancelAddBtn = document.getElementById("cancelAddBtn");
const newCategory = document.getElementById("newCategory");


// hanterar request med url och head
async function fetchData(url, options) {
    try {
        const res = await fetch(url, options);
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        console.log(error)
    }
}

// Hanterar datan för att sedan kunna lägga in det i kort
 async function createDataForCards(url) {
    const data = await fetchData(url);
    const productForShow = []

    data.products.forEach(product => {
        productForShow.push({id:product.id, title:product.title, price:product.price, img:product.images, tags:product.tags})
    });

    return productForShow

}

async function createCards(data) {

    data.forEach(product => {

        const container = document.getElementById("adminPageContent");

        const card = document.createElement("div");
        card.classList.add("card-root-container", "adminCard");


        const a = document.createElement('a');
        a.href = `details.html?id=${product.id}`

        const img = document.createElement("img");
        img.src = product.img[0];
        img.alt = "Bild på " + product.title;
        img.classList.add("adminImage");
        a.append(img)


        const title = document.createElement("h3");
        title.textContent = product.title;

        const price = document.createElement("p");
        price.textContent = "$" + product.price;

        const tags = document.createElement("p");
        tags.textContent = product.tags.join(", ");


        const info = document.createElement("div");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("adminButton");


        function showView() {
            info.replaceChildren(title, price, tags, editBtn);
        }

        // Byter så man kan redigera
        editBtn.addEventListener("click", () => {
            const titleInput = document.createElement("input");
            titleInput.value = product.title;
            titleInput.classList.add("adminInput");

            const priceInput = document.createElement("input");
            priceInput.type = "number";
            priceInput.value = product.price;
            priceInput.classList.add("adminInput");

            const saveBtn = document.createElement("button");
            saveBtn.textContent = "Save";
            saveBtn.classList.add("adminButton");

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("adminButton", "adminDeleteButton");

            const cancelBtn = document.createElement("button");
            cancelBtn.textContent = "Cancel";
            cancelBtn.classList.add("adminButton");


            saveBtn.addEventListener("click", async () => {
                const newTitle = titleInput.value;
                const newPrice = Number(priceInput.value);

                await fetchData(productsUrl + "/" + product.id, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title: newTitle, price: newPrice })
                });

                product.title = newTitle;
                product.price = newPrice;
                title.textContent = newTitle;
                price.textContent = "$" + newPrice;
                showView();
            });

            deleteBtn.addEventListener("click", async () => {

                await fetchData(productsUrl + "/" + product.id, { method: "DELETE" });
                products = products.filter(prod => prod.id !== product.id);
                card.remove();
            });

            cancelBtn.addEventListener("click", showView);

            info.replaceChildren(titleInput, priceInput, tags, saveBtn, deleteBtn, cancelBtn);
        });

        showView();
        card.append(a, info);
        container.append(card);
    });
}


//Skapar dropdown filter
async function createFilter()
{
    const categorys = await fetchData("https://dummyjson.com/products/category-list")

    const dropdown = document.getElementById("filterDropDown");

    categorys.forEach(filter => {
        const option = document.createElement("option");

        option.value = filter.toLowerCase();
        option.textContent = filter;
        const categoryOption = document.createElement("option");
        categoryOption.value = filter;
        categoryOption.textContent = filter;
        newCategory.appendChild(categoryOption);

        dropdown.appendChild(option);
    }
);}


// Ändrar korten som visas enligt filter
dropdown.addEventListener("change", async function () {
    adminPageContent.innerHTML = ""

    const selectedFilter = this.value
    console.log(selectedFilter)

    if (selectedFilter === "All") {
        products = await createDataForCards(productsUrl)
        createCards(products)

    }
    else {
        products = await createDataForCards(`https://dummyjson.com/products/category/${selectedFilter}`)
        createCards(products)

    }
})


// Ändrar korten som visas enligt sök
searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    dropdown.value = "All";
    adminPageContent.innerHTML = "";

    const seartchWord = searchInput.value;

    products = await createDataForCards(`https://dummyjson.com/products/search?q=${seartchWord}`)
    if (products.length == 0) {
        adminPageContent.innerHTML = "INGET HITTAT";
    }
    else{
        createCards(products)
    }
});


// Sorterar produktlistan
sortDropdown.addEventListener("change", function () {
    if (this.value === "price-asc") products.sort((a, b) => a.price - b.price);
    if (this.value === "price-desc") products.sort((a, b) => b.price - a.price);
    if (this.value === "title-asc") products.sort((a, b) => a.title.localeCompare(b.title));
    if (this.value === "title-desc") products.sort((a, b) => b.title.localeCompare(a.title));

    adminPageContent.innerHTML = "";
    createCards(products);
})


//öppnar och stänger lägga till form
addProductBtn.addEventListener("click", () => {
    addProduct.classList.remove("hidden");
});
cancelAddBtn.addEventListener("click", () => {
    addProduct.classList.add("hidden");
});

addProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newProduct = {
        title: document.getElementById("newTitle").value,
        price: Number(document.getElementById("newPrice").value),
        images: [document.getElementById("newImage").value],
        category: newCategory.value
    };

    const saved = await fetchData(`${productsUrl}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct)
    });
    const cardProduct = {
        id: saved.id,
        title: saved.title,
        price: saved.price,
        img: saved.images,
        tags: [saved.category]
    };

    products.unshift(cardProduct);
    adminPageContent.innerHTML = "";
    createCards(products);


    addProductForm.reset();
    addProduct.classList.add("hidden");
});



// Start
let products = await createDataForCards(productsUrl)
createCards(products)
createFilter()
