<template>
  <BaseBadge
    size="sm"
    :label="label"
    :class="[typeComputed]"
    class="mb-1 mr-1 transition-colors duration-500"
  >
  </BaseBadge>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  type?: "default" | "success" | "error";
}>();

const typeComputed = computed(() => {
  switch (props.type) {
    case "success": {
      return "bg-emerald-100 dark:bg-emerald-800 text-emerald-500  dark:text-emerald-100";
    }
    case "error": {
      return "bg-rose-100 dark:bg-rose-800 text-rose-500 dark:text-rose-100";
    }
    default: {
      return "bg-zinc-300 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-100";
    }
  }
});
</script>
