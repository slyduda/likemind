<template>
  <div
    class="relative max-w-fit flex-grow overflow-x-auto rounded-xl shadow-md"
  >
    <table
      class="text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
    >
      <tr
        class="sticky top-0 bg-zinc-50 text-xs uppercase text-zinc-700 dark:bg-zinc-700 dark:text-zinc-400"
      >
        <th v-for="key in keys" :key="key" scope="col" class="px-6 py-3">
          {{ key }}
        </th>
      </tr>
      <tr
        v-for="obj in data"
        :key="obj.id ? obj.id : obj"
        class="border-b odd:bg-white even:bg-zinc-50 dark:border-zinc-700 odd:dark:bg-zinc-900 even:dark:bg-zinc-800"
      >
        <td
          v-for="key in keys"
          :key="key"
          class="overflow-hidden whitespace-nowrap px-6 py-4"
        >
          <div class="max-w-72">{{ obj[key] ? obj[key] : "" }}</div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: any[];
}>();

const keys = computed<string[]>(() => {
  // Use map() to get an array of keys for each object
  const keysArrays = props.data.map((data: Object) =>
    typeof data === "object" ? Object.keys(data) : [],
  );

  // Use reduce() to flatten the array of arrays into a single array
  const allKeys = keysArrays.reduce((acc, keys) => acc.concat(keys), []);

  // Convert the array into a Set to eliminate duplicates
  const uniqueKeysSet = new Set(allKeys);

  // Convert the Set back into an array if necessary
  return Array.from(uniqueKeysSet);
});
</script>
