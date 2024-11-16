
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemon_Image = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const bprew = document.querySelector('.bprew');
const bnext= document.querySelector('.bnext');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const ApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (ApiResponse.status==200){
    const data = await ApiResponse.json();
    return data;}
}

const renderPokemon = async (pokemon)=> {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML='';

    // const é função em js
    // aqui esperamos a resposta da API
    const data = await fetchPokemon(pokemon);
    
    if (data){
        pokemon_Image.style.display = 'block'
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML=data.id;
    pokemon_Image.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
}

    else{
        pokemon_Image.style.display = 'none';
        pokemonName.innerHTML='Not found :c';
        pokemonNumber.innerHTML = '';
        input.value = '';
    }
    
}
// momento da pesquisa
// form
form.addEventListener('submit',(event)=> {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    
})
// botão anterior
bprew.addEventListener("click", () =>{
    if (searchPokemon > 1){
        searchPokemon -=1;
        renderPokemon(searchPokemon);
    }
    
})
// botão next 
bnext.addEventListener('click',() => {
    searchPokemon +=1;
    renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon);