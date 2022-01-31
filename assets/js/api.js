const API = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0";

const getData = (api) => {
  return fetch(api)
    .then((res) => res.json())
    .then((data) => getPokemonData(data.results))
    .catch((error) => console.error("Error en la API:", error));
};

const getPokemonData = (pokemonData) => {
  pokemonData.forEach((pokemon) => {
    fetch(pokemon.url)
      .then((res) => res.json())
      .then((data) => fillData(data))
      .catch((error) => console.error("Error en la API:", error));
  });
};

const BGCOLOR = {
  grass: "bg-success",
  fire: "bg-danger",
  water: "bg-primary",
  bug: "bg-warning",
  electric: "bg-warning.bg-gradient",
};

const fillData = (pokemon) => {
  let html = "";
  html += '<div class="col">';
  html += `<div class="card h-100 ${pokemon.types[0].type.name} p-2 text-white">`;
  html += '<div class="card-body text-center fs-4">';
  html += `<h5 class="card-title fs-2">${
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
  }</h5>`;
  html += `<p class="card-text">Height: ${pokemon.height}</p>`;
  html += `<p class="card-text">Weight: ${pokemon.weight}</p>`;
  html += "</div>";
  html += `<img src="${pokemon.sprites.other.dream_world.front_default}" class="card-img-top" alt="...">`;
  html += "</div>";
  html += "</div>";
  document.getElementById("characters").innerHTML += html;
};

getData(API);
