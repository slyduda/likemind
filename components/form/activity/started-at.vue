<template>
  <div class="mb-4">
    <ClientOnly>
      <div ref="pair" class="relative w-full sm:w-64">
        <BaseInput
          ref="input"
          v-model="value"
          required
          :label="label"
          name="description"
          border
          :classes="classesComputed"
          size="sm"
          @focus="show"
        >
        </BaseInput>
        <button ref="input"></button>
        <VDatePicker
          v-if="(activityStore.isEvent || activityStore.isOngoing) && visible"
          v-model="activityStore.range.start"
          is-required
          class="w-full"
          :max-date="new Date()"
        ></VDatePicker>
        <VDatePicker
          v-else-if="visible"
          v-model.range="activityStore.range"
          class="w-full"
          is-range
          :max-date="new Date()"
        ></VDatePicker>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useActivityStore } from "@/stores/activity.ts";

const pair = ref(null);
const input = ref<HTMLDivElement | null>(null);
const visible = ref(false);

const activityStore = useActivityStore();
const label = computed(() =>
  activityStore.isEvent
    ? "Took Place On"
    : activityStore.isOngoing
      ? "Started At"
      : "Date Range",
);

const show = () => {
  visible.value = true;
  input.value?.focus();
};
const hide = () => {
  visible.value = false;
};

onClickOutside(pair, hide);

const classesComputed = computed(() => {
  if (visible.value) return "rounded-b-0 rounded-t-lg";
  return "rounded-lg";
});

const value = computed(
  () =>
    activityStore.startedAtFormatted +
    (activityStore.isEvent || activityStore.isOngoing
      ? ""
      : ` - ${activityStore.endedAtFormatted}`),
);
</script>

<style>
.vc-container {
  width: 100%;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top-width: 0;
}
</style>
