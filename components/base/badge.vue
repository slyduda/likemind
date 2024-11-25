<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: "sm" | "md" | "lg";
    label: string;
  }>(),
  {
    size: "md",
  },
);

const sizeComputed = computed(() => {
  switch (props.size) {
    case "sm":
      return "px-1 h-4 text-xs";
    case "md":
      return "px-1 h-5 text-sm";
    case "lg":
      return "px-1.5 h-6";
  }
});
</script>

<template>
  <div
    :class="[sizeComputed]"
    class="archivo relative flex items-center justify-center rounded"
  >
    <div>
      {{ label }}
    </div>
  </div>
</template>
