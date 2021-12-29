const quoteUrl = "https://breaking-bad-quotes.herokuapp.com/v1/quotes";

const setQuote = quote => {
    getById("quoteText").innerText = quote;
}

const setAuthor = author => {
    getById("breakingBadAuthor").innerText = author;
}

const getQuote = () => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(quote.quote);
    setAuthor(quote.author);
}

getQuote();