const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonInfo = () => {
    const text = document.getElementById("pokemonSearch").value;
    fetch(pokemonUrl + text.toLowerCase())
        .then(response => response.json())
        .then(data => {
            document.getElementById("pokemon").style.backgroundImage = `url(${data.sprites.other.dream_world.front_default})`
            document.getElementById("pokemonId").innerText = data.id;
            document.getElementById("pokemonName").innerText = data.name;
            document.getElementById("pokemonHeight").innerText = data.height;
            document.getElementById("pokemonWeight").innerText = data.weight;
            document.getElementById("pokemonHp").innerText = data.stats[0].base_stat;
            document.getElementById("pokemonType").innerText = data.types[0].type.name;
            document.getElementById("pokemonAtk").innerText = data.stats[1].base_stat;
            document.getElementById("pokemonDef").innerText = data.stats[2].base_stat;
        })
        .catch(err => console.error(err));
}

// display a message whenever no results are found