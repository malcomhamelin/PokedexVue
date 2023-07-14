<template>
    <dialog id="my_modal_1" class="modal modal-open">
        <form method="dialog" class="modal-box">
          <img class="w-full" :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png'" alt="{{ name }}">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeDetails()">✕</button>
          <h3 class="font-bold text-lg text-center">{{ name }}</h3>

          <h4 class="font-bold text-lg text-left mt-5">Types</h4>
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(type, index) in pokemonData.types">
                  <td>{{ type.type.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 class="font-bold text-lg text-left mt-5">Base abilities</h4>
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(ability, index) in pokemonData.abilities">
                  <td>{{ ability.ability.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 class="font-bold text-lg text-left mt-5">Base stats</h4>
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(stat, index) in pokemonData.stats">
                  <td>{{ stat.stat.name }}</td>
                  <td>{{ stat.base_stat }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
    </dialog>
</template>

<script setup>

import { onMounted, ref } from "vue";

const props = defineProps({
  name: String,
  url: String,
  id: String
});

const pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon'
const pokemonData = ref([])

function fetchPokemon() {
    console.log(pokeApiUrl + '/' + props.id)

    fetch(pokeApiUrl + '/' + props.id)
    .then(response => response.json())
    .then(data => {
        pokemonData.value = data
        console.log(pokemonData.value)
    })
}

const emit = defineEmits(["close"]);

function closeDetails() {
  emit("close");
}

onMounted(() => {
  fetchPokemon()
})
</script>