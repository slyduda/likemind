<template>
  <div class="container h-full w-full">
    <div v-if="data" class="h-full">
      <AppHeader :title="data.name">
        <BaseButton class="bg-emerald-500" @click="loadSim">Load</BaseButton>
      </AppHeader>
      <div class="flex">
        <div class="mx-2 rounded-lg px-2 py-1 hover:bg-stone-800">About</div>
        <div class="mx-2 rounded-lg px-2 py-1 hover:bg-stone-800">
          Activities
        </div>
        <div
          class="mx-2 rounded-lg bg-stone-800 px-2 py-1 underline hover:bg-stone-800"
        >
          Relationships
        </div>
        <div class="mx-2 rounded-lg px-2 py-1 hover:bg-stone-800">Tags</div>
      </div>
      <svg ref="visualization" class="z-50 h-[80%] w-full"></svg>

      <ul class="mt-12 list-inside list-decimal border-t border-zinc-500 pt-8">
        <li
          v-for="related in data.relatedEntities"
          :key="related.id"
          class="mb-0.5"
        >
          {{ related.name }} -
          {{ Math.round(related.relationshipSignificance) }}%
          <ul>
            <li class="text-xs text-stone-400">{{ related.id }}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { safeParse } from "valibot";
import { entityIdSchema } from "~/schemas/entity.schema";
import {
  forceSimulation,
  select,
  forceManyBody,
  forceCenter,
  forceLink,
  schemeCategory10,
  scaleOrdinal,
} from "d3";

definePageMeta({
  middleware: "auth",
  validate: async (route) => {
    const result = safeParse(entityIdSchema, route.params.id);
    if (!result.success) return false;
    return true;
  },
});

type EntityReadSchemaMap = {
  [index: string]: any;
};
type EntityGroupMap = {
  [index: string]: number;
};
type EntitySignificanceMap = {
  [index: string]: [number];
};
const { onResponseError, onRequestError } = useLogging();
const requests = ref<EntityReadSchemaMap>({});
const groups = ref<EntityGroupMap>({});
const significances = ref<EntitySignificanceMap>({});
const route = useRoute();
const { data } = await useFetch(`/api/entities/entities/${route.params.id}`, {
  onResponseError,
  onRequestError,
});
if (data.value) {
  requests.value[data.value.id] = data;
  groups.value[data.value.id] = 0;

  const relatedEntities = data.value.relatedEntities;
  const relatedEntityIds: string[] = relatedEntities.map((entity) => entity.id);
  const secondResponse = await $fetch("/api/entities/entities", {
    method: "POST",
    body: {
      ids: relatedEntityIds,
    },
  });

  for (const [key, value] of Object.entries(secondResponse)) {
    requests.value[key] = value;
    groups.value[key] = 1;

    for (const subkey of value.relatedEntities.map((related) => related.id)) {
      // eslint-disable-next-line no-prototype-builtins
      if (!groups.value.hasOwnProperty(subkey)) groups.value[subkey] = 2;
    }
  }
}

const visualization = ref<HTMLElement | null>(null);
const simulation = ref<any>();
const selection = ref<any>();

onMounted(() => {
  // loadSim();
});

const loadSim = () => {
  if (simulation.value) simulation.value.stop();
  if (selection.value) selection.value.selectAll("*").remove();

  selection.value = select(visualization.value);

  const width = visualization.value?.clientWidth ?? 600;
  const height = visualization.value?.clientHeight ?? 600;

  selection.value.attr("width", width).attr("height", height);
  const { nodes, links } = entityComplexDataBuilder(
    requests.value,
    groups.value,
  );

  const color = scaleOrdinal(schemeCategory10);

  // Create force simulation
  simulation.value = forceSimulation(nodes)
    .force("link", forceLink(links))
    .force("charge", forceManyBody().strength(-500))
    .force("center", forceCenter(width / 2, height / 2));

  // Create links
  const link = selection.value
    .append("g")
    .attr("stroke-width", 4)
    .attr("class", "stroke-[#94A3B8] dark:stroke-[#1E293B]")
    .attr("stroke-opacity", 20)
    .selectAll("line")
    .data(links)
    .join("line");

  // Create nodes
  const node = selection.value
    .append("g")
    .attr("stroke-width", 0)
    .attr("class", "stroke-black dark:stroke-stone-50")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", (d: any) => 15 + (d.size - d.group * 0.3) * 15)
    .attr("fill", (d: any) =>
      d.group === 0 ? "#34d399" : d.group === 1 ? "#fde68a" : "#f87171",
    ); // Set the fill color based on the index of the node

  // Add text labels to nodes
  const text = selection.value
    .append("g")
    .attr("font-weight", "bold")
    .attr("class", "text-black dark:text-stone-50")
    .attr("class", "fill-black dark:fill-stone-50")
    .selectAll("text")
    .data(nodes)
    .join("text")
    .attr("dx", (d: any) => 15 + d.size * 10) // Offset the text horizontally from the circle
    .attr("dy", (d: any) => -15 - d.size * 12) // Offset the text vertically to center it
    .attr("class", "text-xs")
    .text((d: any) => (d.group < 2 ? `${d.name} ${d.size}` : ""));

  simulation.value.on("tick", () => {
    link
      .attr("x1", (d: any) => d.source.x)
      .attr("y1", (d: any) => d.source.y)
      .attr("x2", (d: any) => d.target.x)
      .attr("y2", (d: any) => d.target.y);

    node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);

    text.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y);
  });
};

onBeforeUnmount(() => {
  simulation.value.stop();
  selection.value.exit();
});
</script>
