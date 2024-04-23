<template>
  <div>
    <BaseButton class="mt-2 bg-red-500 text-red-50" @click="clear">
      Clear Data
    </BaseButton>
    <BaseButton class="mt-2 bg-blue-500 text-blue-50" @click="load">
      Load Demo
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const clear = () => {
  $fetch("/api/data", {
    method: "DELETE",
  });
};

const load = () => {
  $fetch("/api/data/demo", {
    method: "POST",
  });
};
</script>
