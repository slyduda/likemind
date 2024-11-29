<template>
  <div class="flex h-full w-full flex-grow text-zinc-900 dark:text-stone-50">
    <div
      id="fake_nav"
      class="flex-shrink-0 bg-zinc-100 sm:hidden dark:bg-stone-950"
      :class="[{ 'w-16': !hiddenSidebar }, { 'w-0': hiddenSidebar }]"
    ></div>

    <AppNavBar
      v-model:collapsed="mainStore.collapsedSidebar"
      v-model:hidden="hiddenSidebar"
      class="h-full flex-shrink-0"
    />

    <div class="w-1 flex-1 bg-zinc-200 dark:bg-stone-950">
      <div
        class="h-full w-full p-2"
        :class="[{ 'pl-2': hiddenSidebar }, { 'pl-0': !hiddenSidebar }]"
      >
        <div
          class="h-full overflow-auto rounded-xl bg-zinc-100 px-4 dark:bg-stone-900"
        >
          <slot />
        </div>
      </div>
    </div>

    <div
      class="absolute z-50 h-full w-full sm:hidden"
      :class="[
        { 'pointer-events-none bg-black/0': mainStore.collapsedSidebar },
        { 'pointer-events-auto': holdMute },
        {
          'pointer-events-auto bg-black/10 backdrop-blur-md':
            !mainStore.collapsedSidebar,
        },
      ]"
      @touchend="lift"
      @click="collapse"
    ></div>

    <div
      class="pointer-events-none absolute right-0 top-0 z-50 flex h-full w-full flex-col items-end"
    >
      <ul class="mt-4 flex flex-col items-end md:w-1/2">
        <li
          v-for="message in unacknowledgedMessages"
          :key="message.id"
          class="pointer-events-auto"
        >
          <AppAlert :message="message"></AppAlert>
        </li>
      </ul>
    </div>

    <NuxtLoadingIndicator :height="8" color="#3b82f6" />
  </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
const mainStore = useMainStore();

const breakpoints = useBreakpoints(breakpointsTailwind);
const smallerThanSm = breakpoints.smaller("sm"); // only smaller than lg
const hiddenSidebar = ref(false);
const holdMute = useState("holdMute", () => false); // used to make everything on the screen disabled until timer or touchup

watch(holdMute, (val) => {
  if (val) {
    useTimeout(500, {
      callback: () => {
        holdMute.value = false;
      },
    });
  }
});

onBeforeMount(() => {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  // || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  if (mainStore.darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});

onMounted(() => {
  if (!smallerThanSm.value) mainStore.collapsedSidebar = false;
});

const unacknowledgedMessages = computed<Message[]>(() => {
  return mainStore.messages.filter((message) => {
    // Object.hasOwn is not reactive
    // eslint-disable-next-line no-prototype-builtins
    return !mainStore.acknowledgements.hasOwnProperty(message.id);
  });
});

const lift = () => {
  if (holdMute.value) holdMute.value = false;
};

const collapse = () => {
  if (!holdMute.value) mainStore.collapsedSidebar = !mainStore.collapsedSidebar;
};
</script>
