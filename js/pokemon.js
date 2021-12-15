const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonInfo = () => {
    const text = document.getElementById("pokemonSearch").value;
    fetch(pokemonUrl + text.toLowerCase())
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const {
                id,
                name,
                height,
                weight,
                sprites,
                stats,
                types
            } = data;
            const sprite = sprites.other.dream_world && sprites.other.dream_world.front_default || sprites.front_default;
            const hp = stats[0].base_stat;
            const atk = stats[1].base_stat;
            const def = stats[2].base_stat;
            document.getElementById("pokemon").style.backgroundImage = `url(${sprite})`
            document.getElementById("pokemonId").innerText = id;
            document.getElementById("pokemonName").innerText = name;
            document.getElementById("pokemonHeight").innerText = height;
            document.getElementById("pokemonWeight").innerText = weight;
            document.getElementById("pokemonHp").innerText = hp;
            document.getElementById("pokemonType").innerText = types[0].type.name;
            document.getElementById("pokemonAtk").innerText = atk;
            document.getElementById("pokemonDef").innerText = def;
        })
        .catch(err => console.error(err));
}

// display a message whenever no results are found