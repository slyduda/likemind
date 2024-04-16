<script setup lang="ts">
interface Props {
  name: string;
  label: string;
  required?: boolean;
}
const { name = "", label = "", required = false } = defineProps<Props>();
</script>

<template>
  <label
    v-if="label"
    :id="`${name} label`"
    :for="name"
    :required="required"
    class="text mb-1 block font-medium"
  >
    {{ label }}
    <span
      v-if="required"
      class="ml-1 rounded bg-red-100 px-1 py-0.5 text-xs text-red-500 dark:bg-red-500 dark:text-red-100"
    >
      * required
    </span>
  </label>
</template>
