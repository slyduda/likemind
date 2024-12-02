<template>
  <NuxtLink :to="`/activities/${id}`">
    <div class="rounded-xl border border-zinc-300 px-4 py-2">
      <div class="flex items-center text-sm font-semibold">
        <div v-if="isEvent" class="flex">
          <Icon name="solar:calendar-mark-bold-duotone" class="h-5 w-5"></Icon>
          <div class="ml-1 inline-flex pt-0.5">
            {{ formatDate(started) }}
          </div>
        </div>
        <div v-else class="flex">
          <Icon name="solar:calendar-bold-duotone" class="h-5 w-5"></Icon>
          <div class="ml-1 inline-flex pt-0.5">
            {{ formatDate(started) }} - {{ ended ? formatDate(ended) : "Now" }}
          </div>
        </div>
      </div>

      <ul v-if="tags || entities" class="mt-1 flex flex-wrap">
        <li>
          <AppActivityBadge
            v-for="tag in visibleTags[0]"
            :key="tag.id"
            :name="tag.name"
            :overlaps="
              Boolean(
                overlappedTags.filter(
                  (t) => t.id === tag.id || t.name === tag.name,
                ).length,
              )
            "
          >
          </AppActivityBadge>
          <AppActivityBadge
            v-if="visibleTags[1].length"
            :name="`+${visibleTags[1].length} tag`"
          ></AppActivityBadge>
        </li>
        <li>
          <AppActivityBadge
            v-for="entity in visibleEntities[0]"
            :key="entity.id"
            :name="entity.name"
            :overlaps="
              Boolean(
                overlappedEntities.filter(
                  (e) => e.id === entity.id || e.name === entity.name,
                ).length,
              )
            "
          >
          </AppActivityBadge>
          <BaseBadge
            v-if="visibleEntities[1].length"
            :label="`+${visibleEntities[1].length} entity`"
            class="mb-1 mr-1 bg-zinc-700 text-white"
          />
        </li>
      </ul>

      <p class="whitespace-pre-wrap">
        {{ truncateFirstParagraph(description, 200) }}
      </p>
      <div class="flex w-full items-end justify-between">
        <div></div>
        <div class="text-xs text-gray-500">
          {{ formatRelativeTime(created) }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string;
  description: string;
  startedAt: string;
  endedAt: string | null;
  createdAt: string;
  entities?: {
    id: string;
    name: string;
  }[];
  tags?: {
    id: string;
    name: string;
  }[];
  queriedTags?: {
    id?: string;
    name?: string;
  }[];
  queriedEntities?: {
    id?: string;
    name?: string;
  }[];
}>();

const created = ref(new Date(props.createdAt));
const started = ref(new Date(props.startedAt));
const ended = ref(props.endedAt ? new Date(props.endedAt) : null);
const isEvent = computed(
  () => started.value.getTime() === ended.value?.getTime(),
);

const overlappedTags = computed(() => {
  const queriedTags = props.queriedTags || [];
  const tags = props.tags || [];

  // Convert queriedTags into a Set for efficient matching
  const queriedIds = new Set(queriedTags.map((tag) => tag.id).filter(Boolean));
  const queriedNames = new Set(
    queriedTags.map((tag) => tag.name).filter(Boolean),
  );

  // Filter tags that match either by id or name
  return tags.filter(
    (tag) =>
      (tag.id && queriedIds.has(tag.id)) ||
      (tag.name && queriedNames.has(tag.name)),
  );
});

const visibleTags = computed(() => {
  const maxVisible = 2; // Maximum tags to show
  const tags = props.tags || [];
  const overlappedTagsValue = overlappedTags.value;

  // Sort tags to prioritize overlappedTags first
  const sortedTags = [
    ...overlappedTagsValue,
    ...tags.filter((tag) => !overlappedTagsValue.includes(tag)),
  ];

  // Separate visible tags and hidden tags
  const visible = sortedTags.slice(0, maxVisible);
  const hidden = sortedTags.slice(maxVisible);

  return [visible, hidden] as const;
});

const overlappedEntities = computed(() => {
  const queriedEntities = props.queriedEntities || [];
  const entities = props.entities || [];

  // Convert queriedEntities into a Set for efficient matching
  const queriedIds = new Set(
    queriedEntities.map((entity) => entity.id).filter(Boolean),
  );
  const queriedNames = new Set(
    queriedEntities.map((entity) => entity.name).filter(Boolean),
  );

  // Filter entities that match either by id or name
  return entities.filter(
    (entity) =>
      (entity.id && queriedIds.has(entity.id)) ||
      (entity.name && queriedNames.has(entity.name)),
  );
});

const visibleEntities = computed(() => {
  const maxVisible = 2; // Maximum entities to show
  const entities = props.entities || [];
  const overlappedEntitiesValue = overlappedEntities.value;

  // Sort entities to prioritize overlappedEntities first
  const sortedEntities = [
    ...overlappedEntitiesValue,
    ...entities.filter((entity) => !overlappedEntitiesValue.includes(entity)),
  ];

  // Separate visible entities and hidden entities
  const visible = sortedEntities.slice(0, maxVisible);
  const hidden = sortedEntities.slice(maxVisible);

  return [visible, hidden] as const;
});
</script>
