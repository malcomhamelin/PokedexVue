<template>
    <div class="container mx-auto">
        <div class="flex flex-col items-center justify-center">
            <h1 class="mb-2 mt-0 text-5xl font-medium leading-tight text-primary">Pokedex Vue</h1>

            <form class="mt-5 w-1/2">
                <div class="flex items-center border-b border-teal-500 py-2 object-center">
                    <input class="object-center appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                        type="text" v-model="input" placeholder="Search by name..." aria-label="Full name" @input="displaySearchedPokemons()">
                </div>
            </form>
        </div>
        

        <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 
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
    </div>
    
</template>

<script setup>

import {ref, onMounted} from 'vue';
import CardComponent from "../components/CardComponent.vue"

const pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon'
const maxNumberOfPokemons = 152
const numberOfPokemonPerPage = 25

const allPokemons = ref([])
let pokemonsDisplayed = ref([])
let filteredPokemons = ref([])
let currentPage = 0
let maxPage = ref(Math.ceil((maxNumberOfPokemons / numberOfPokemonPerPage) - 1));

let input = ref("");

function fetchPokemons() {
    fetch(pokeApiUrl + '?limit=' + maxNumberOfPokemons)
    .then(response => response.json())
    .then(data => {
        allPokemons.value = data.results
        filteredPokemons.value = data.results
        pokemonsDisplayed.value = data.results.slice(0, numberOfPokemonPerPage)
    })
}

function setPokemonsToDisplay() {
    filterPokemonsByName()
    const sliceValue = currentPage * numberOfPokemonPerPage;
    pokemonsDisplayed.value = filteredPokemons.value.slice(sliceValue, sliceValue + numberOfPokemonPerPage)
}

function nextPage() {
    if (currentPage < getMaxPage()) {
        currentPage++
        setPokemonsToDisplay()
    }
}

function previousPage() {
    if (currentPage > 0) {
        currentPage--
        setPokemonsToDisplay()
    }
}

function filterPokemonsByName() {
    filteredPokemons.value = allPokemons.value.filter((pokemon) => pokemon.name.includes(input.value.toLowerCase()))
    maxPage.value = getMaxPage()
}

function displaySearchedPokemons() {
    filterPokemonsByName()
    currentPage = 0
    setPokemonsToDisplay()
}

function getPokemonId(pokemonUrl) {
    return pokemonUrl.split("/")[6];
}

function getMaxPage() {
    return Math.ceil((filteredPokemons.value.length / numberOfPokemonPerPage) - 1)
}

onMounted(() => {
    fetchPokemons();
})  

</script>