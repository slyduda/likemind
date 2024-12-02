<template>
  <BaseCheckbox v-model="activityStore.isOngoing" class="mb-4" name="ongoing"
    >This activity is still ongoing
  </BaseCheckbox>
</template>

<script setup lang="ts">
import { useActivityStore } from "@/stores/activity.ts";

const activityStore = useActivityStore();

const event = computed(() => (activityStore.isEvent ? true : false));
watch(event, (val) => {
  if (val) activityStore.isOngoing = false;
});
</script>
