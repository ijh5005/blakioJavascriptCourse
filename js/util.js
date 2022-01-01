const offscreen = "offscreen";

const toggleAttribute = (ele, attr, value="") => {
    const hasAttribute = ele.hasAttribute(offscreen);
    if(hasAttribute){
        // remove the offset attribute
        ele.removeAttribute(attr);
    } else {
        // add the offset attribute
        ele.setAttribute(attr, value);
    }
}

const getById = id => {
    const ele = document.getElementById(id);
    return ele;
}
