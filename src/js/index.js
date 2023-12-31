const loading = document.querySelector(".loading");

const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonGif = document.querySelector(".pokemon-gif");

const form = document.querySelector(".form");
const input = document.querySelector(".input-search");
const lupa=document.querySelector(".lupa");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

const dataCard = document.querySelector(".card");
const about = document.querySelector(".about")

let searchPokemon = 1;

gerarDadosPokemon("1");
function rolarParaOBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  gerarDadosPokemon(input.value.toLowerCase());
  if (window.innerWidth < 550) {
    rolarParaOBottom();
  }
  
});
lupa.addEventListener("click", ()=>{
  gerarDadosPokemon(input.value.toLowerCase());
  if (input.value=="") {
    pokemonName.innerHTML = "";
    pokemonNumber.innerHTML = "";
    pokemonGif.style.display = "none";
    dataCard.style.display = "none";
    about.style.display = "none";
  }
  if (window.innerWidth < 550) {
    rolarParaOBottom();
  }
})

btnPrev.addEventListener("click", () => {

  if (searchPokemon > 1) {
    searchPokemon -= 1;
    gerarDadosPokemon(searchPokemon);
  }
  if (window.innerWidth < 550) {
    rolarParaOBottom();
  }
});
btnNext.addEventListener("click", () => {
  searchPokemon += 1;
  gerarDadosPokemon(searchPokemon);
  if (window.innerWidth < 550) {
    rolarParaOBottom();
  }

});

async function gerarPokemon(pokemon) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
}

async function gerarDadosPokemon(pokemon) {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  const data = await gerarPokemon(pokemon);


  if (data) {
    pokemonGif.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonGif.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"];
      
  const types = data.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
    data.types = types;
    data.type = type;
   
    dataCard.innerHTML=` <div class="card ${data.type}"> 
                            <ul class="types">                     
                              <li>
                               ${data.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}                        
                              </li>
                            </ul>
                            <h2 class="pokemon-name-card">${data.name}</h2>
                            <p class="pokemon-number-card">#${data.id}</p>
                            <img class="pokemon-image"src="${data.sprites.other.dream_world.front_default}" alt="${data.name}">
                        </div>`           
                    
  const skills = data.abilities.map((skill) => skill.ability.name);
  const [skill1, skill2 = "only one skill"] = skills;
    data.skill1 = skill1;
    data.skill2 = skill2;

  const statsValues = data.stats.map((stats) => stats.base_stat);
  const [statValueHp, statValueAtk, statValueDef,statValueSatk,statValueSdef,statValueSpd,] = statsValues;
  
    data.statValueHp = statValueHp;
    data.statValueAtk = statValueAtk;
    data.statValueDef = statValueDef;
    data.statValueSatk = statValueSatk;
    data.statValueSdef = statValueSdef;
    data.statValueSpd = statValueSpd;

    about.innerHTML=`
                        
                        <ul class="atributes">  
                            <li class="atribute">Hp<span>${data.statValueHp}</span></li>
                            <li class="atribute">Attack<span> ${data.statValueAtk}</span></li>
                            <li class="atribute">Defense<span> ${data.statValueDef}</span></li>
                            <li class="atribute">Sp-atk<span> ${data.statValueSatk}</span></li>
                            <li class="atribute">Sp-def<span>${data.statValueSdef}</span></li>
                            <li class="atribute">Speed<span>${data.statValueSpd}</span></li>
                        </ul>
                       
                        <ul class="skills"
                            <li class="skill">${data.skill1} - ${data.skill2}</li>
                        </ul>`     

    input.value = "";
    searchPokemon = data.id;
  } else {
    pokemonName.innerHTML = "Not found";
    pokemonNumber.innerHTML = "";
    pokemonGif.style.display = "none";
    dataCard.style.display = "none";
    about.style.display = "none";
    
  }
}


