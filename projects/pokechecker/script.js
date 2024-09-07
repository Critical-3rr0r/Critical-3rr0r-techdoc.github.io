const input = document.getElementById("search-input");
const button = document.getElementById("search-button");
const imageWrap = document.getElementById("img-wrap");
const pokeName = document.getElementById("pokemon-name");
const pokeId = document.getElementById("pokemon-id");
const pokeWeight = document.getElementById("weight");
const pokeHeight = document.getElementById("height");
const pokeType = document.getElementById("types");
const pokeHealth = document.getElementById("hp");
const pokeAtk = document.getElementById("attack");
const pokeDef = document.getElementById("defense");
const pokeSpAtk = document.getElementById("special-attack");
const pokeSpDef = document.getElementById("special-defense");
const pokeSpeed = document.getElementById("speed");
const getPokeData = (data) => {
    const pokeHolder = {};
    let undefinedText = false;
    const pokeNameOrId = input.value.toLowerCase() === undefined ? "" : input.value.toLowerCase();
    if (!isNaN(parseInt(pokeNameOrId))) {
        const pokeData = data.results[parseInt(pokeNameOrId) - 1];
        pokeHolder.id = pokeData.id;
        pokeHolder.name = pokeData.name;
        pokeHolder.url = pokeData.url;
    } else {
        const pokeData = data.results.filter((poke) => poke.name === pokeNameOrId)[0];
        if (pokeData === undefined) {
            undefinedText = true;
        } else {
            pokeHolder.id = pokeData.id;
            pokeHolder.name = pokeData.name;
            pokeHolder.url = pokeData.url;
        }
    };
    if (undefinedText || !isNaN(parseInt(pokeNameOrId)) && parseInt(pokeNameOrId) != pokeNameOrId) {
        return null;
    } else {
        return pokeHolder;
    }
};
const updateUI = (id, name, height, weight, types, stats, sprites) => {
    pokeType.innerHTML = "";
    pokeName.textContent = `${name.toUpperCase()}`;
    pokeId.textContent = `#${id}`;
    pokeWeight.textContent = `Weight: ${weight}`;
    pokeHeight.textContent = `Height: ${height}`;
    imageWrap.innerHTML = `<img src="${sprites.front_default}" id="sprite" class="image">`;
    types.forEach((value) => pokeType.innerHTML += `<span class="${value.type.name}">${value.type.name}</span>`);
    pokeHealth.textContent = `${stats[0].base_stat}`;
    pokeAtk.textContent = `${stats[1].base_stat}`;
    pokeDef.textContent = `${stats[2].base_stat}`;
    pokeSpAtk.textContent = `${stats[3].base_stat}`;
    pokeSpDef.textContent = `${stats[4].base_stat}`;
    pokeSpeed.textContent = `${stats[5].base_stat}`;
};
const getPoke = async () => {
    try {
        const response = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
        const data = await response.json();
        const pokeData = getPokeData(data);
        if (pokeData != null) {
            const { id, name, url } = pokeData;
            const pokeResponse = await fetch(url);
            const pokeStats = await pokeResponse.json();
            const { sprites, stats, types, height, weight } = pokeStats;
            updateUI(id, name, height, weight, types, stats, sprites);
        } else if (pokeData === null) {
            alert("Pokémon not found");
            console.log("error");
        }
    } catch {

    }
}
button.addEventListener("click", () => {
    getPoke()
});
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getPoke();
    }
})