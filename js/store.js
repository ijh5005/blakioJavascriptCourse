let selectedProduct = "";
let allProducts = [];

// https://crudcrud.com/


const getCrudUrl = () => {
    const crudId = document.querySelector("#storeHeader input");
    return `https://crudcrud.com/api/${crudId.value}`;
}

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

const populateShelf = () => {
    // fetch(`${getCrudUrl()}/store`, {
    //     method: "GET"
    // }).then(data => {
    //     data.json().then(data => {
    //         allProducts = data;
    //         shelfStatus();
    //         populateHTML(data);
    //     });
    // })
}

const addToShelf = body => {
    fetch(`${getCrudUrl()}/store`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => {
        populateShelf();
    }).catch(err => console.log(err));
}

const addItem = () => {
    const priceOfProduct = getById("selectedPrice").value;
    getById("selectedPrice").value = "";
    console.log(`item to add ${selectedProduct} at $${priceOfProduct}`);
    setHelpText("");
    hideElementById("setPriceContainer");
    const body = {
        selectedProduct,
        priceOfProduct
    }
    addToShelf(body);
}

const deleteFromShelf = id => {
    fetch(`${getCrudUrl()}/${id}`).then(data => {
        populateShelf();
    }).catch(err => console.log(err)); 
}

const populateHTML = data => {
    getById("pricedItems").innerHTML = "";
    const products = data.splice(0, 4);
    products.forEach(data => {
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
    
        const deleteBtn = document.createElement("div");
        deleteBtn.classList.add("btn");
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = deleteFromShelf(data._id);
    
        div.appendChild(productDiv);
        div.appendChild(update);
        div.appendChild(deleteBtn);
    
        getById("pricedItems").appendChild(div);
    });
}

const shelfStatus = () => {
    if(allProducts.length >= 4){
        setHelpText("Shelf full. Delete items to add more.");
        hideElementById("createItemBtn");
    } else {
        if(allProducts.length === 1){
            getById("pricedItems").classList.add("diplayNone");
        }
    }
}

populateShelf();

// improvements
// if an item is already on the shelf prevent the user from adding it again at a different price
// if the price is zero prevent from adding