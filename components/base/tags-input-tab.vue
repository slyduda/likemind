<template>
  <BaseBadge
    :id="value"
    :label="truncateText(value, 32)"
    size="lg"
    class="bg-zinc-700 text-white"
  >
    <template #right>
      <button
        class="flex h-6 w-6 flex-shrink-0 items-center justify-center hover:bg-white/40"
        @click="emit('removeTab', index)"
      >
        ✕
      </button>
    </template>

    <template v-if="icon" #left>
      <div
        class="relative flex h-full w-6 items-center justify-center bg-white/10"
      >
        <Icon :name="icon"></Icon>
      </div>
    </template>
  </BaseBadge>
</template>

<script setup lang="ts">
const props = defineProps<{
  index: number;
  tag: string | { value: string; icon: string };
}>();

const value = computed(() =>
  typeof props.tag === "string" ? props.tag : props.tag.value,
);
const icon = computed(() => {
  return typeof props.tag === "string" ? null : props.tag.icon;
});

const emit = defineEmits(["removeTab"]);
</script>
