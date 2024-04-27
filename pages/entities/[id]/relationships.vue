<template>
  <div class="h-full">
    <svg ref="visualization" class="z-50 h-full w-full"></svg>
  </div>
</template>

<script setup lang="ts">
const { onResponseError, onRequestError } = useLogging();

const route = useRoute();
const id = Array.isArray(route.params.id)
  ? route.params.id.join()
  : route.params.id;

const { data } = await useFetch(`/api/entities/entities/${id}`, {
  query: {
    depth: 3,
  },
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

  const entityMap = entityComplexFlattener(data.value);
  const d3Data = entityComplexDataBuilder(
    entityMap,
    entityComplexGroupBuilder(id, entityMap),
    entityComplexMassBuilder(id, entityMap),
  );

  simulationRef.value = entityComplexForceSimulation(
    visualization.value,
    d3Data,
    { strength: 10 },
  );
});

onBeforeUnmount(() => {
  simulationRef.value.stop();
});
</script>
