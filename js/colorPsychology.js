const getColorBox = text => {
    // create a div
    const div = document.createElement("div");
    // add classes to div
    div.classList.add("btn");
    div.classList.add(colorMap[text]);
    // set div text to word
    div.innerText = text;
    return div;
}

const setColorToWord = () => {
    for(let text in colorMap){
        // get div with text
        const div = getColorBox(text);
        // add div to HTML
        getById("colorPsychology").appendChild(div);
    }
}

setColorToWord();

// improvement
// randomize the object so that we don't get the same color back to back