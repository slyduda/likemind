<template>
  <div class="flex flex-1 flex-col">
    <form v-if="activityStore.page === 1" class="flex-1">
      <FormActivitySource></FormActivitySource>
      <FormActivityDescription></FormActivityDescription>
    </form>
    <form v-else-if="activityStore.page === 2" class="flex-1">
      <FormActivityTags></FormActivityTags>
      <FormActivityEntity></FormActivityEntity>
    </form>
    <form v-else class="flex-1">
      <FormActivityIsOngoing></FormActivityIsOngoing>
      <FormActivityIsEvent></FormActivityIsEvent>
      <FormActivityStartedAt></FormActivityStartedAt>
    </form>
    <div
      class="sticky bottom-0 flex w-full items-center justify-between border-t border-zinc-500 py-4"
    >
      <div class="flex flex-1 flex-col items-center md:items-end">
        <div
          class="flex w-16 justify-center pb-1 text-sm font-bold capitalize text-zinc-500"
        >
          {{ activityStore.pageTitle }}
        </div>
        <div class="flex w-16 flex-1 justify-center gap-2">
          <BasePaginationDot
            :active="activityStore.page > 0"
          ></BasePaginationDot>
          <BasePaginationDot
            :active="activityStore.page > 1"
          ></BasePaginationDot>
          <BasePaginationDot
            :active="activityStore.page > 2"
          ></BasePaginationDot>
        </div>
      </div>
      <div class="flex flex-1 justify-end gap-2">
        <BaseButton
          :disabled="!activityStore.canGoBack"
          class="w-20 bg-rose-500 text-rose-50"
          rounded="lg"
          :class="[{ 'opacity-0': activityStore.page === 1 }]"
          size="sm"
          @click="activityStore.back"
          >Back</BaseButton
        >
        <BaseButton
          v-if="activityStore.page !== 3"
          :disabled="!activityStore.canGoNext"
          class="w-20 bg-emerald-500 text-emerald-50"
          rounded="lg"
          size="sm"
          @click="activityStore.next"
        >
          Next</BaseButton
        >
        <BaseButton
          v-else
          :disabled="!activityStore.canSubmit || buffer"
          class="w-20 bg-blue-500 text-blue-50"
          rounded="lg"
          size="sm"
          @click="submit"
        >
          Submit</BaseButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useActivityStore } from "@/stores/activity.ts";

const { onResponse, onResponseError } = useLogging();

const activityStore = useActivityStore();

const loading = ref(false);

const submit = async () => {
  console.log(activityStore.body);
  if (!activityStore.canSubmit) return;
  loading.value = true;
  try {
    await $fetch("/api/activities/form", {
      method: "POST",
      body: activityStore.body,
      onResponseError,
      onResponse,
    });
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const buffer = ref(false);
watch(
  () => activityStore.page,
  (val) => {
    if (val === 3) {
      buffer.value = true;
      useTimeoutFn(() => {
        buffer.value = false;
      }, 1000);
    }
  },
);
</script>
