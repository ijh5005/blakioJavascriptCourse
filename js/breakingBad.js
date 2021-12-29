const quoteUrl = "https://breaking-bad-quotes.herokuapp.com/v1/quotes";

const setQuote = quote => {
    innerText(getById("quoteText"), quote);
}

const setAuthor = author => {
    innerText(getById("breakingBadAuthor"), author);
}

const getQuote = () => {
    fetch(quoteUrl)
        .then(response => response.json())
        .then(data => {
            // set quote to HTML
            setQuote(data[0].quote);
            // set author to HTML
            setAuthor(data[0].author)
        })
        .catch(err => console.error(err));
}

getQuote();