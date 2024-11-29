<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    pending?: boolean;
    disabled?: boolean;
    size?: "sm" | "md" | "lg" | "xs";
    rounded?: "md" | "lg" | "xl" | "sm";
  }>(),
  {
    pending: false,
    disabled: false,
    size: "md",
    rounded: "xl",
  },
);

const sizeComputed = computed(() => {
  switch (props.size) {
    case "xs":
      return "px-2 h-8";
    case "sm":
      return "px-3 h-10";
    case "md":
      return "px-4 h-12";
    case "lg":
      return "px-4 h-14";
  }
});

const roundedComputed = computed(() => {
  switch (props.rounded) {
    case "sm":
      return "rounded-sm";
    case "xl":
      return "rounded-xl";
    case "lg":
      return "rounded-lg";
    default:
      return "rounded";
  }
});

const isDisabledOrPending = computed(
  () => props.disabled == true || props.pending == true,
);
</script>

<template>
  <button
    :disabled="isDisabledOrPending"
    :class="[sizeComputed, roundedComputed]"
    class="archivo relative flex items-center justify-center transition-colors disabled:bg-zinc-300 disabled:text-zinc-500 dark:disabled:bg-zinc-800"
  >
    <div :class="[{ invisible: pending }]">
      <slot></slot>
    </div>
    <div
      class="absolute left-0 top-0 flex h-full w-full items-center justify-center"
    >
      <div v-if="pending" class="animate-spin">
        <SvgSpinner></SvgSpinner>
      </div>
    </div>
  </button>
</template>
