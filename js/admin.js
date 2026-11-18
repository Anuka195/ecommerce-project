const dropdown = document.getElementById("filterDropDown");
const sortDropdown = document.getElementById("sortDropDown");
const adminPageContent = document.getElementById("adminPageContent");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const productsUrl = 'https://dummyjson.com/products'


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

// Skapar korten (utan cart- och favorites-knappar)
async function createCards(data) {

    data.forEach(product => {

        const container = document.getElementById("adminPageContent");

        const card = document.createElement("div");


        const a = document.createElement('a');
        a.href = `details.html?id=${product.id}`

        const img = document.createElement("img");
        img.src = product.img[0];
        a.append(img)


        const title = document.createElement("h3");
        title.textContent = product.title;

        const price = document.createElement("p");
        price.textContent = "$" + product.price;

        const tags = document.createElement("p");
        tags.textContent = product.tags.join(", ");


        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => {
            // TODO: lägg till vad som ska hända när man redigerar produkten
            console.log("Edit product:", product.id);
        });


        const info = document.createElement("div");
        info.append(title, price, tags, editBtn);
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


// On start
let products = await createDataForCards(productsUrl)
createCards(products)
createFilter()
