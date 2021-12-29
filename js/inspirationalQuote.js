const inspirationalQuoteUrl = "https://type.fit/api/quotes";

const getRandomQuoteIndex = maxNum => {
    const index = Math.floor(Math.random() * maxNum);
    return index;
}

const setQuoteDate = () => {
    const time = new Date();
    const dateString = time.toDateString(); //returns a string (e.g. "Fri May 9 2020")
    const split = dateString.split(" ");
    const day = split[0];
    const month = split[1];
    const dateNumber = split[2];
    getById("dailyMemoDay").innerText = `${month} ${day}`;
    getById("dailyMemoDateNumber").innerText = dateNumber;
}

const getInspirationalQuote = () => {
    fetch(inspirationalQuoteUrl).then(response => response.json()).then(data => {
        const randonIndex = getRandomQuoteIndex(data.length);
        getById("inspirationalQuote").innerText = data[randonIndex].text;
    }).catch(err => {
        console.error(err);
    });
    setQuoteDate();
}

getInspirationalQuote();

// update the date and affirmation everyday at 12am