const jokeUrl = "https://icanhazdadjoke.com/";

const getNewJoke = () => {
    fetch(jokeUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(data => {
            document.getElementById("jokeText").innerText = data.joke;
        })
        .catch(err => console.error(err));
}

getNewJoke();