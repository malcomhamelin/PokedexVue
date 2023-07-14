<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg p-5">
    <img class="w-full" :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png'" alt="{{ name }}">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2 text-center">{{ name }}</div>
    </div>
    <div class="card-actions justify-center">
      <button class="btn" @click="reverseShowDetails()">See more</button>
    </div>
  </div>

  <DetailComponent v-if="showDetails" :name="name" :url="url" @close="reverseShowDetails()" />
</template>

<script setup>

import DetailComponent from './DetailComponent.vue'
import { ref } from "vue";

let showDetails = ref(false);

defineProps({
  name: String,
  url: String,
  id: String,
});

function reverseShowDetails() {
  showDetails.value = !showDetails.value
}

</script>