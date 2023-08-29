
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const infoQuadro = document.getElementById('info-quadro');


const maxRecords = 151
const limit = 10
let offset = 0


function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => `<li class="pokemon ${pokemon.type}">
      <span class="number">#${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>

      <div class="details">
        <ol class="types">
          ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
        </ol>


        <img src="${pokemon.photo}"
          alt="${pokemon.name}">
      </div>
    </li>
`).join('')

    pokemonList.innerHTML += newHtml

  })

}

loadPokemonItens(offset, limit)

pokemonList.addEventListener('click', (event) => {
  const clickedPokemon = event.target.closest('.pokemon');
  if (clickedPokemon) {
    const pokemonDetails = clickedPokemon.querySelector('.details').innerHTML;
    infoQuadro.innerHTML = ""; // Limpar o conteúdo anterior
    infoQuadro.insertAdjacentHTML('beforeend', `<div class='info-quadro-conteudo-pokemon'>${pokemonDetails}</div>`);
    infoQuadro.style.display = 'block';
    fecharQuadroButton.style.display = 'block'; // Exibir o botão de fechar

    // Fechar quadro anterior, se estiver aberto
    if (pokemonList.querySelector('.active')) {
      pokemonList.querySelector('.active').classList.remove('active');
    }
    clickedPokemon.classList.add('active');
  }
});

const fecharQuadroButton = document.getElementById('fecharQuadro');
fecharQuadroButton.addEventListener('click', () => {
  infoQuadro.style.display = 'none';
});

fecharQuadroButton.addEventListener('click', () => {
  infoQuadro.style.display = 'none';
  fecharQuadroButton.style.display = 'none';
});


loadMoreButton.addEventListener('click', () => {
  offset += limit

  const qtdRecordNexrPage = offset + limit

  if (qtdRecordNexrPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {

    loadPokemonItens(offset, limit)
  }

})






