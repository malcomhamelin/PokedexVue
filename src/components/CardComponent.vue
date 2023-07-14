<template>
    <div>
        {{ name }}
    </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  name: String,
  url: String,
});
</script>