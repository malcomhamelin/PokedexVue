<template>
    <dialog id="my_modal_1" class="modal modal-open">
        <form method="dialog" class="modal-box">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeDetails()">✕</button>
            <h3 class="font-bold text-lg">{{ name }}</h3>
            <p class="py-4">{{ url }}</p>
        </form>
    </dialog>
</template>

<script setup>

import { onMounted, ref } from "vue";

const props = defineProps({
  name: String,
  url: String,
});

const emit = defineEmits(["close"]);

function closeDetails() {
  emit("close");
}

</script>