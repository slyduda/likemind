<template>
  <div
    :class="[{ 'pointer-events-none opacity-0': !props.show }]"
    class="archivo whitespace-nowrap rounded pl-2 pr-3 transition-opacity dark:text-white"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean;
}>();
</script>
