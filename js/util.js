const hasAttribute = (ele, attr) => {
    const hasAttr = ele.hasAttribute(attr);
    return hasAttr
}

const removeAttribute = (ele, attr) => {
    ele.removeAttribute(attr);
}

const addAttribute = (ele, attr, value) => {
    const v = value || "";
    ele.setAttribute(attr, v);
}

const toggleAttribute = (ele, attr, value) => {
    const hasAttr = hasAttribute(ele, attr);
    if(hasAttr){
        removeAttribute(ele, attr);
    } else {
        addAttribute(ele, attr, value);
    }
}

const getById = id => {
    const ele = document.getElementById(id);
    return ele;
}
