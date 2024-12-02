<template>
  <div>
    <div v-if="data">
      <div>
        <ul>
          <li v-if="data.endedAt === null" class="inline-block">
            <BaseBadge
              size="md"
              label="ongoing"
              class="mr-1 bg-red-500 text-red-50"
            />
          </li>
          <li v-for="tag in data.tags" :key="tag" class="inline-block">
            <BaseBadge
              size="md"
              :label="tag"
              class="mr-1 bg-teal-500 text-teal-50"
            />
          </li>
        </ul>
        <p class="whitespace-pre-wrap">{{ data.description }}</p>
      </div>

      <div class="mt-4">
        <h2>Entities</h2>
        <ul>
          <li
            v-for="entity in data.entities"
            :key="entity"
            class="inline-block"
          >
            <BaseBadge
              size="lg"
              :label="entity"
              class="mr-1 bg-zinc-700 text-zinc-50"
            />
          </li>
        </ul>
      </div>

      <div class="mt-4">
        <div v-if="data.startedAt === data.endedAt">
          <h3>Happened On</h3>
          <p>{{ data.startedAt }}</p>
        </div>
        <div v-else>
          <h3>Started</h3>
          <p>{{ data.startedAt }}</p>
          <p></p>
          <h3>Ended</h3>
          <p>{{ data.endedAt }}</p>
        </div>
      </div>

      <div class="mt-4">
        <h2>Sources</h2>
        <ul>
          <li v-for="evidence in data.evidences" :key="evidence.id">
            <AppEvidence v-bind="evidence"></AppEvidence>
          </li>
        </ul>
      </div>

      <div>
        <h3>Extra</h3>
        <div>importance: {{ data.importance }}</div>
        <div>reviews: {{ data.reviewCount }}</div>
        <ul>
          <li v-for="review in data.reviews" :key="review.id">{{ review }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { onResponseError, onRequestError } = useLogging();

const route = useRoute();
const id = Array.isArray(route.params.id)
  ? route.params.id.join()
  : route.params.id;

const { data } = await useFetch(`/api/activities/${id}`, {
  onResponseError,
  onRequestError,
});

console.log(data);
</script>
