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

const setColorToWord = () => {
    for(let text in colorMap){
        const div = document.createElement("div");
        div.classList = "btn " + colorMap[text];
        div.innerText = text;
        document.getElementById("colorPsychology").appendChild(div);
    }
}

setColorToWord();

// improvement
// randomize the object so that we don't get the same color back to back