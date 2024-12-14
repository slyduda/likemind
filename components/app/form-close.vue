<template>
  <button class="h-full w-8" @click="close">
    <Icon name="solar:close-square-bold-duotone" class="h-full w-full"></Icon>
  </button>
</template>

<script setup lang="ts">
const formStore = useFormStore();

const close = () => {
  formStore.cancel();
};
</script>
