// text to color mapper
const colorMap = {
    Excitement: "cpRed",
    Strength: "cpRed",
    Love: "cpRed",
    Energy: "cpRed",
    Confidence: "cpOrange",
    Success: "cpOrange",
    Bravery: "cpOrange",
    Sociability: "cpOrange",
    Creativity: "cpYellow",
    Happiness: "cpYellow",
    Warmth: "cpYellow",
    Cheer: "cpYellow",
    Nature: "cpGreen",
    Healing: "cpGreen",
    Freshness: "cpGreen",
    Quality: "cpGreen",
    Trust: "cpBlue",
    Peace: "cpBlue",
    Loyalty: "cpBlue",
    Competence: "cpBlue",
    Compassion: "cpPink",
    Sincetity: "cpPink",
    Sweet: "cpPink",
    Royalty: "cpPurple",
    Luxury: "cpPurple",
    Spirituality: "cpPurple",
    Ambition: "cpPurple",
    Dependable: "cpBrown",
    Rugged: "cpBrown",
    Trustworthy: "cpBrown",
    Simple: "cpBrown",
    Formality: "cpBlack",
    Dramatic: "cpBlack",
    Sophistication: "cpBlack",
    Security: "cpBlack",
    Clean: "cpWhite",
    Simplicity: "cpWhite",
    Innocence: "cpWhite",
    Honest: "cpWhite"
}

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