const quoteUrl = "https://breaking-bad-quotes.herokuapp.com/v1/quotes";

const getQuote = () => {
    fetch(quoteUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById("quoteText").innerText = data[0].quote;
            document.getElementById("breakingBadAuthor").innerText = data[0].author;
        })
        .catch(err => console.error(err));
}

getQuote();