<script setup lang="ts">

const props = withDefaults(defineProps<{
  pending?: boolean,
  disabled?: boolean
  size?: "sm" | "md" | "lg" | "xs"
}>(), {
  pending: false,
  disabled: false,
  size: "md"
})

const size = computed(() => {
  switch (props.size) {
    case "xs":
      return "px-2 h-8"
    case "sm":
      return "px-3 h-10"
    case "md":
      return "px-4 h-12"
    case "lg":
      return "px-4 h-14"
  }
})

const isDisabledOrPending = computed(() => props.disabled == true || props.pending == true)

</script>

<template>
  <button :disabled="isDisabledOrPending" :class="[size]"
    class="flex items-center justify-center rounded-xl relative disabled:bg-zinc-300 dark:disabled:bg-zinc-800 disabled:text-zinc-500 archivo transition-colors">
    <div :class="[{ 'invisible': pending }]">
      <slot></slot>
    </div>
    <div class="absolute w-full h-full top-0 left-0 flex items-center justify-center">
      <div v-if="pending" class="animate-spin">
        <SvgSpinner></SvgSpinner>
      </div>
    </div>
  </button>
</template>