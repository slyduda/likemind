<script setup lang="ts">
interface Props {
  name: string;
  label: string;
  required?: boolean;
}
const { name = "", label = "", required = false } = defineProps<Props>()
</script>

<template>
  <label v-if="label" :id="`${name} label`" :for="name" :required="required" class="block text font-medium mb-1">
    {{ label }}
    <span v-if="required"
      class="ml-1 bg-red-100 dark:bg-red-500 text-red-500 dark:text-red-100 text-xs rounded py-0.5 px-1">
      * required
    </span>
  </label>
</template>