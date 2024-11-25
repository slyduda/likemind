<template>
  <div
    class="flex flex-1 flex-col justify-between rounded-xl px-4 py-4"
    :class="[
      { 'bg-emerald-200 text-green-800': colorComputed === 'green' },
      { 'bg-yellow-200 text-yellow-800': colorComputed === 'yellow' },
      { 'bg-red-200 text-red-800': colorComputed === 'red' },
    ]"
  >
    <div>
      <div>{{ entity.name }}</div>
      <div class="text-sm">{{ description }}</div>
      <div class="text-xs">Sentiment: {{ sentiment }}</div>
      <div class="text-xs">Impact: {{ impact }}</div>
    </div>
    <div>
      <div class="pt-2 text-sm">Sources</div>
      <ul>
        <li v-for="evidence in evidences" :key="evidence.id">
          <div
            class="rounded p-0.5 px-1 text-xs"
            :class="[
              { 'bg-emerald-500 text-green-100': colorComputed === 'green' },
              { 'bg-yellow-500 text-yellow-100': colorComputed === 'yellow' },
              { 'bg-red-500 text-red-100': colorComputed === 'red' },
            ]"
          >
            {{ evidence.source }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InvolvementComplexRead } from "~/services/involvement/involvementList";

const props = defineProps<InvolvementComplexRead>();

const colorComputed = computed(() => {
  switch (true) {
    case props.sentiment > 20:
      return "green"; // Green for sentiment above 20
    case props.sentiment < -20:
      return "red"; // Red for sentiment below -20
    default:
      return "yellow"; // Yellow for sentiment between -20 and 20
  }
});
</script>
