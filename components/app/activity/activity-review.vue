<template>
  <button class="h-full w-8" @click="review">
    <Icon name="solar:pen-new-square-bold-duotone" class="h-full w-full"></Icon>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
}>();

const formStore = useFormStore();

const review = () => {
  formStore.setForm("activity-review");
};
</script>
