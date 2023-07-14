<template>
    <div>
        <div v-for="pokemon in pokemonsDisplayed">
            <CardComponent :name="pokemon.name" />
        </div>
        <button @click="nextPage"></button>
    </div>
</template>

<script setup>

import {ref, onMounted} from 'vue';
import CardComponent from "../components/CardComponent.vue"

const pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon'
const numberOfPokemonPerPage = 25
const pokemonsDisplayed = ref([]);
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

onMounted(() => {
    fetchPokemons(0);
})  

</script>