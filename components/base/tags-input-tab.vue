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
        <SvgCloud v-if="icon === 'svg-cloud'" class="ping"></SvgCloud>
        <SvgCloudCheck v-if="icon === 'svg-cloud-check'"></SvgCloudCheck>
        <SvgCloudCross v-if="icon === 'svg-cloud-cross'"></SvgCloudCross>
        <SvgListCheckBold
          v-if="icon === 'svg-list-check-bold'"
        ></SvgListCheckBold>
        <SvgListCrossBold
          v-if="icon === 'svg-list-cross-bold'"
        ></SvgListCrossBold>
        <SvgBlackHole
          v-if="icon === 'svg-black-hole'"
          class="animate-spin text-purple-300"
        ></SvgBlackHole>
        <SvgAi v-if="icon === 'svg-ai'" class="text-yellow-300"></SvgAi>
        <SvgDangerTriangle
          v-if="icon === 'svg-danger-triangle'"
        ></SvgDangerTriangle>
        <SvgVerifiedCheckBold
          v-if="icon === 'svg-verified-check-bold'"
        ></SvgVerifiedCheckBold>
        <SvgLink v-if="icon === 'svg-link'" class="p-1"></SvgLink>
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
