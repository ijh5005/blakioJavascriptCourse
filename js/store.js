// https://crudcrud.com/

let apiKey;

let numProductsOnShelf = 0;

const showElementById = id => {
    getById(id).classList.remove("displayNone");
}

const hideElementById = id => {
    getById(id).classList.add("displayNone");
}

const setHelpText = text => {
    getById("productHelpText").innerText = text;
}

const addItemToDB = () => {
    console.log("adding item to db");
    const item = setPriceContainer.getAttribute("data-item");
    const cost = parseFloat(document.getElementById("selectedPrice").value);
    const image = setPriceContainer.getAttribute("data-image");
    fetch(getUrl(), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            item, cost, image
        })
    }).then(d => {
        loadStore();
        resetSelectedItem();
    }).catch(err => console.log(err));
}

const choiceProduct = item => {
    if(numProductsOnShelf === 4){
        setHelpText("Shelf is full");
        return;
    }
    showPriceContainer({image: `${item}.png`});
    const cost = parseFloat(document.getElementById("selectedPrice").value);
    const setPriceContainer = document.getElementById("setPriceContainer");
    setPriceContainer.setAttribute("data-item", item);
    setPriceContainer.setAttribute("data-cost", cost);
    setPriceContainer.setAttribute("data-image", `${item}.png`);
}

const resetSelectedItem = () => {
    document.getElementById("selectedPrice").value = "";
    const setPriceContainer = document.getElementById("setPriceContainer");
    setPriceContainer.removeAttribute("data-id");
    setPriceContainer.removeAttribute("data-item");
    setPriceContainer.removeAttribute("data-image");
    setPriceContainer.removeAttribute("data-cost");
    hideElementById("setPriceContainer");
}

const updateItem = product => {
    const { id, item, cost, image } = product;
    fetch(getUrl(id), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item, cost, image })
    }).then(d => {
        loadStore();
        resetSelectedItem();
    }).catch(err => console.log(err));
}

const deleteItem = id => {
    fetch(getUrl(id), {
        method: 'DELETE'
    }).then(data => {
        loadStore();
    }).catch(err => console.log(err)); 
}

const onAdd = () => {
    const setPriceContainer = document.getElementById("setPriceContainer");
    const id = setPriceContainer.getAttribute("data-id");
    if(id){
        const item = setPriceContainer.getAttribute("data-item");
        const cost = parseFloat(document.getElementById("selectedPrice").value);
        const image = setPriceContainer.getAttribute("data-image");
        updateItem({id, item, cost, image});
    } else {
        addItemToDB();
    }
}

const showPriceContainer = (product) => {
    hideElementById("itemSelection");
    setHelpText("Set Price of Product");
    showElementById("setPriceContainer");
    getById("selectedProduct").style.backgroundImage = `url(./assets/${product.image})`;
}

const updateProduct = product => {
    showPriceContainer(product);
    const setPriceContainer = document.getElementById("setPriceContainer");
    setPriceContainer.setAttribute("data-id", product._id);
    setPriceContainer.setAttribute("data-item", product.item);
    setPriceContainer.setAttribute("data-cost", product.cost);
    setPriceContainer.setAttribute("data-image", product.image);
}

const getParentElement = () => {
    const div = document.createElement("div");
    div.classList.add("quarterWidth", "flexCol");
    return div;
}

const getProductElement = data => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("flex", "fullSize");
    const price = document.createElement("span");
    price.classList.add("redText", "priceText");
    price.innerText = `$${parseFloat(data.cost).toFixed(2)}`;
    const product = document.createElement("div");
    product.classList.add("shelfedProduct");
    product.style.backgroundImage = `url(./assets/${data.image})`;
    productDiv.appendChild(price);
    productDiv.appendChild(product);
    return productDiv;
}

const getUpdateBtn = product => {
    const update = document.createElement("div");
    update.classList.add("btn");
    update.setAttribute("data-product", product.item);
    update.setAttribute("data-price", product.cost);
    update.innerText = "Update";
    update.onclick = () => updateProduct(product);
    return update;
}

const getDeleteBtn = product => {
    const deleteBtn = document.createElement("div");
    deleteBtn.classList.add("btn");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => deleteItem(product._id);
    return deleteBtn;
}

const populateShelf = products => {
    getById("pricedItems").innerHTML = "";
    products.forEach(data => {

        // TODO
        // start hooking up the update and delete btns next
        // then work on only displaying the products that dont come back from the api
        // in the add items section

        const div = getParentElement();
        const productDiv = getProductElement(data);
        const update = getUpdateBtn(data);
        const deleteBtn = getDeleteBtn(data);
    
        div.appendChild(productDiv);
        div.appendChild(update);
        div.appendChild(deleteBtn);
    
        getById("pricedItems").appendChild(div);
    });
}

const getUrl = (id="") => {
    return `https://crudcrud.com/api/${apiKey}/store/${id}`;
}

const fetchItems = () => {
    fetch(getUrl()).then(data => {
        data.json().then(items => {
            numProductsOnShelf = items.length;
            populateShelf(items);
            hideElementById("loadStore");
            setHelpText("Select a Product");
            showElementById("itemSelection");
        })
    }).catch(err => console.log(err));
}

const loadStore = () => {
    apiKey = getById("crudKey").value;
    if(apiKey.length){
        fetchItems();
    }
}

// improvements
// if an item is already on the shelf prevent the user from adding it again at a different price
// if the price is zero prevent from adding