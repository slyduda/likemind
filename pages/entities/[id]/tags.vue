<template>
  <div class="h-full pb-4">
    <svg ref="visualization" class="z-50 h-full w-full"></svg>
  </div>
</template>

<script setup lang="ts">
const { onResponseError, onRequestError } = useLogging();

const route = useRoute();
const id = Array.isArray(route.params.id)
  ? route.params.id.join()
  : route.params.id;

const { data } = await useFetch(`/api/entities/tags/${id}`, {
  onResponseError,
  onRequestError,
});

const visualization = ref<SVGAElement | null>(null);
const simulationRef = ref<any>();
const selectionRef = ref<any>();

onMounted(() => {
  if (!data.value || !visualization.value) return;
  if (simulationRef.value) simulationRef.value.stop();
  if (selectionRef.value) selectionRef.value.selectAll("*").remove();

  const countMap = tagCountMapBuilder(data.value);
  const d3Data = tagDataBuilder(data.value, countMap);

  simulationRef.value = tagTreemap(visualization.value, d3Data);
});
</script>
