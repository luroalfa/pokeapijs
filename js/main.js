// TODO convert this to typescript
/**
 * We create constant to manipulate the information and to create the render.
 */
const container = document.getElementById("container");
const spinner = document.getElementById("spinnerContainer");
const previous = document.getElementById("preview");
const next = document.getElementById("next");

/**
 * In this function we create a constant with information important!
 * @param {JSON} data General information about each pokemon.
 * @returns It returns important information about each pokemon I want to render.
 */
const toCreatePokemon = (data) => {
  const pokemon = {
    img: data.sprites.other.dream_world.front_default,
    number: data.id.toString(),
    name: data.name,
    weight: data.weight,
    height: data.height,
    exp: data.base_experience,
    ability: data.abilities[0].ability.name,
  };
  return pokemon;
};

/**
 * 
 * @param {pokemon} pokemon A pokemon is received to render in the DOM.
 */
function renderPokemon(pokemon) {
  spinner.style.display = "none";
  const containerCard = document.createElement("section");
  containerCard.classList.add("containerCard");
  const card = document.createElement("article");
  card.classList.add("card");
  const imgContainer = document.createElement("header");
  imgContainer.classList.add("header");
  const context = document.createElement("section");
  context.classList.add("context");
  const footer = document.createElement("footer");
  footer.classList.add("footer");

  const sprite = document.createElement("img");
  sprite.src = pokemon.img;

  const number = document.createElement("p");
  number.textContent = `#${pokemon.number}`;
  const name = document.createElement("h2");
  name.classList.add("name");
  name.textContent = pokemon.name;
  const abilities = document.createElement("h3");
  abilities.textContent = "Ability";
  const size = document.createElement("span");
  size.textContent = pokemon.weight;

  const sectionFooter1 = document.createElement("section");
  sectionFooter1.classList.add("sectionFooter");
  const sectionFooter2 = document.createElement("section");
  sectionFooter2.classList.add("sectionFooter");
  const sectionFooter3 = document.createElement("section");
  sectionFooter3.classList.add("sectionFooter");

  const heightTitle = document.createElement("span");
  heightTitle.classList.add("footerTitle");
  heightTitle.textContent = "Height";
  const expTitle = document.createElement("span");
  expTitle.classList.add("footerTitle");
  expTitle.textContent = "Exp";
  const weightTitle = document.createElement("span");
  weightTitle.classList.add("footerTitle");
  weightTitle.textContent = "Weight";

  const Heigth = document.createElement("span");
  Heigth.textContent = pokemon.height;
  const exp = document.createElement("span");
  exp.textContent = pokemon.exp;
  const ability = document.createElement("p");
  ability.textContent = pokemon.ability;

  imgContainer.appendChild(sprite);

  context.appendChild(number);
  context.appendChild(name);
  context.appendChild(abilities);
  context.appendChild(ability);

  sectionFooter1.appendChild(heightTitle);
  sectionFooter1.appendChild(Heigth);

  sectionFooter2.appendChild(expTitle);
  sectionFooter2.appendChild(exp);

  sectionFooter3.appendChild(weightTitle);
  sectionFooter3.appendChild(size);

  card.appendChild(imgContainer);
  card.appendChild(context);

  footer.appendChild(sectionFooter1);
  footer.appendChild(sectionFooter2);
  footer.appendChild(sectionFooter3);

  containerCard.appendChild(card);
  containerCard.appendChild(footer);
  container.appendChild(containerCard);
}

/**
 *This is a async function which await the fetch PokeApi
 * @param {string} url This is the text of the url
 */
async function fetchPoke(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    // If there some error throw the following status
    if (!res.ok) throw { status: res.status, statusText: res.statusText };


    // We activate and deactivate and pass the next url and previous url
    previous.style.display = data.previous ? "flex" : "none";
    previous.setAttribute("href", data.previous);
    next.style.display = data.next ? "flex" : "none";
    next.setAttribute("href", data.next);

    // It traverse and render the array
    for (i = 0; i < data.results.length; i++) {
      try {
        let res = await fetch(data.results[i].url),
          pokemon = await res.json();
        // If there some error throw the following status
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        renderPokemon(toCreatePokemon(pokemon));
      } catch (e) {
        console.log(e);
        let message = e.statusText || "Ocurrió un Error";
        console.log(`Error ${e.status}: ${message}`);
      }
    }
  } catch (e) {
    console.log(e);
    let message = e.statusText || "Ocurrió un Error";
    console.log(`Error ${e.status}: ${message}`);
  }
}

fetchPoke(`https://pokeapi.co/api/v2/pokemon`);

next.addEventListener('click', e => {
  e.preventDefault();
  container.innerHTML = "";
  fetchPoke(e.target.closest('a').getAttribute('href'));
});
previous.addEventListener('click', e => {
  e.preventDefault();
  container.innerHTML = "";
  fetchPoke(e.target.closest('a').getAttribute('href'));
});

/*

 En esta practica estoy aprendiendo a utilizar --> jsDoc de javascript para comentar mi codigo.
 Tambien estoy utilizando clases para instanciar un objecto creado para el objeto

 */
