<template>
    <div class="container mx-auto p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 
                lg:grid-cols-5 xl:grid-cols-5 gap-5">
        <div v-for="(pokemon, id) in pokemonsDisplayed">
            <CardComponent :name="pokemon.name" :id="getPokemonId(pokemon.url)" />
        </div>

        <div class="inline-flex">
            <button class="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l"
                    :disabled="currentPage == 0" :class="[ currentPage == 0 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-400']" @click="previousPage">
                Prev
            </button>

            
            <button class="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
                    :disabled="currentPage == maxPage" :class="[ currentPage == maxPage ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-400']" @click="nextPage">
                Next
            </button>
        </div>
    </div>
</template>

<script setup>

import {ref, onMounted} from 'vue';
import CardComponent from "../components/CardComponent.vue"

const pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon'
const numberOfPokemonPerPage = 25
const pokemonsDisplayed = ref([]);
const maxPage = 6;
var currentPage = 0;

function fetchPokemons(pageNumber) {
    const offset = pageNumber * numberOfPokemonPerPage

    fetch(pokeApiUrl + '?offset=' + offset + '&limit=' + numberOfPokemonPerPage)
    .then(response => response.json())
    .then(data => {
        console.log(data.results)
        pokemonsDisplayed.value = data.results
    })
}

function nextPage() {
    currentPage++
    fetchPokemons(currentPage)
}

function previousPage() {
    currentPage--
    fetchPokemons(currentPage)
}

function getPokemonId(pokemonUrl) {
    return pokemonUrl.split("/")[6];
}

onMounted(() => {
    fetchPokemons(0);
})  

</script>