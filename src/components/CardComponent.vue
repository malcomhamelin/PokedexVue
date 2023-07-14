<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg">
    <img class="w-full" :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png'" alt="{{ name }}">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ name }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  name: String,
  id: String,
});
</script>