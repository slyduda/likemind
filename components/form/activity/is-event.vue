<template>
  <BaseCheckbox v-model="activityStore.isEvent" class="mb-4" name="event">
    This activity finished shortly after it started
  </BaseCheckbox>
</template>

<script setup lang="ts">
import { useActivityStore } from "@/stores/activity.ts";

const activityStore = useActivityStore();

const ongoing = computed(() => (activityStore.isOngoing ? true : false));

watch(ongoing, (val) => {
  if (val) activityStore.isEvent = false;
});
</script>
