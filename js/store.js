let selectedProduct = "";
const allProducts = [];

// https://crudcrud.com/

const showElementById = id => {
    getById(id).classList.remove("displayNone");
}

const hideElementById = id => {
    getById(id).classList.add("displayNone");
}

const setHelpText = text => {
    getById("productHelpText").innerText = text;
}

const createStoreItem = () => {
    hideElementById("createItemBtn");
    setHelpText("Select a Product");
    showElementById("itemSelection");
}

const choiceProduct = product => {
    selectedProduct = product;
    hideElementById("itemSelection");
    setHelpText("Set Price of Product");
    showElementById("setPriceContainer");
    getById("selectedProduct").style.backgroundImage = `url(./assets/${selectedProduct}.png)`
}

const addItem = () => {
    const priceOfProduct = getById("selectedPrice").value;
    getById("selectedPrice").value = "";
    console.log(`item to add ${selectedProduct} at $${priceOfProduct}`);
    setHelpText("");
    hideElementById("setPriceContainer");

    // after request comes back
    allProducts.push({
        selectedProduct,
        priceOfProduct
    })
    addToShelf();
}

const createProducts = () => {
    getById("pricedItems").innerHTML = "";
    allProducts.forEach(data => {
        const div = document.createElement("div");
        div.classList.add("quarterWidth");
        div.classList.add("flexCol");
    
        const productDiv = document.createElement("div");
        productDiv.classList.add("flex");
        productDiv.classList.add("fullSize");
        const price = document.createElement("span");
        price.classList.add("redText");
        price.classList.add("priceText");
        price.innerText = `$${parseFloat(data.priceOfProduct).toFixed(2)}`;
        const product = document.createElement("div");
        product.classList.add("shelfedProduct");
        product.style.backgroundImage = `url(./assets/${data.selectedProduct}.png)`
        productDiv.appendChild(price);
        productDiv.appendChild(product);
    
        const update = document.createElement("div");
        update.classList.add("btn");
        update.setAttribute("data-product", data.selectedProduct);
        update.setAttribute("data-price", data.priceOfProduct);
        update.innerText = "Update";
    
        const edit = document.createElement("div");
        edit.classList.add("btn");
        edit.innerText = "Delete";
    
        div.appendChild(productDiv);
        div.appendChild(update);
        div.appendChild(edit);
    
        getById("pricedItems").appendChild(div);
    });
}

const addToShelf = () => {
    createProducts();
    if(allProducts.length === 4){
        setHelpText("Shelf full. Delete items to add more.");
    } else {
        if(allProducts.length === 1){
            getById("pricedItems").classList.add("diplayNone");
        }
        showElementById("createItemBtn");
    }
}

// improvements
// if an item is already on the shelf prevent the user from adding it again at a different price
// if the price is zero prevent from adding