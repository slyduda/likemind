<script setup lang="ts">
interface Props {
  name: string;
  label: string;
  required?: boolean;
  tags?: string[];
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
    <slot name="tags">
      <span
        v-if="required"
        class="ml-1 rounded bg-red-100 px-1 py-0.5 text-xs text-red-500 dark:bg-red-500 dark:text-red-100"
      >
        required
      </span>
      <span
        v-for="tag in tags"
        :key="tag"
        class="ml-1 rounded bg-zinc-300 px-1 py-0.5 text-xs text-zinc-500 dark:bg-zinc-700 dark:text-zinc-100"
      >
        {{ tag }}
      </span>
    </slot>
  </label>
</template>
