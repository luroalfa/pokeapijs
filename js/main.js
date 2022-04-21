const container = document.getElementById("container");

function fetchPoke(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      createPoke(data)
    })
}


function fetchPokes(number) {
  for (let i = 1; i <= number; i++) {
    fetchPoke(i);
  }
}

function createPoke(pokemon) {
  const card = document.createElement("article");
  card.classList.add("card");

  const imgContainer = document.createElement("header");
  imgContainer.classList.add("imgContainer");

  const sprite = document.createElement("img");
  sprite.src = pokemon.sprites.other.dream_world.front_default;

  imgContainer.appendChild(sprite);

  const number = document.createElement("p");
  number.textContent = `#${pokemon.id.toString().padStart(3.0)}`

  const name = document.createElement("h2");
  name.classList.add("name");
  name.textContent = pokemon.name;

  const abilities = document.createElement("h3");
  abilities.textContent = "Ability"


  const ability = document.createElement("p");
  ability.textContent = pokemon.abilities[0].ability.name


  card.appendChild(imgContainer);
  card.appendChild(number);
  card.appendChild(name);
  card.appendChild(abilities);
  card.appendChild(ability);

  container.appendChild(card);
}

fetchPokes(24);