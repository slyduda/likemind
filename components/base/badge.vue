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
      return "h-4 text-xs";
    case "md":
      return "h-5 text-sm";
    case "lg":
      return "h-6";
  }
});

const paddingComputed = computed(() => {
  switch (props.size) {
    case "sm":
    case "md":
      return "px-1";
    case "lg":
      return "px-1.5";
  }
});
</script>

<template>
  <span
    :class="[sizeComputed]"
    class="archivo inline-flex items-center rounded"
  >
    <slot name="left"></slot>
    <div :class="[paddingComputed]">{{ label }}</div>
    <slot name="right"></slot>
  </span>
</template>
