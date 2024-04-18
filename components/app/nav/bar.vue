<template>
  <div
    class="absolute top-0 z-10 bg-zinc-200 sm:relative sm:p-2 dark:bg-zinc-950"
    :class="[{ 'left-0': !hidden }, { '-left-16': hidden }]"
  >
    <div
      class="relative z-20 flex h-full flex-col justify-between bg-zinc-200 px-3 py-3 sm:rounded-xl sm:rounded-br-none sm:bg-zinc-100 dark:bg-zinc-950 sm:dark:bg-zinc-900"
      :class="[{ 'w-44': !collapsed }, { 'w-16': collapsed }]"
    >
      <div class="flex flex-col">
        <AppNavButton
          to="/"
          label="LikeMind"
          :condensed="collapsed"
          class="mb-2"
        >
          <template #icon>
            <AppNavIcon> 🧠 </AppNavIcon>
          </template>
        </AppNavButton>
        <AppNavButton
          to="/entities"
          label="Entities"
          :condensed="collapsed"
          class="mb-2"
        >
          <template #icon>
            <AppNavIcon> 🧍 </AppNavIcon>
          </template>
        </AppNavButton>
        <AppNavButton
          to="/activities"
          label="Activities"
          :condensed="collapsed"
          class="mb-2"
        >
          <template #icon>
            <AppNavIcon> 🤸 </AppNavIcon>
          </template>
        </AppNavButton>
        <AppNavButton
          to="/communities"
          label="Communities"
          :condensed="collapsed"
          class="mb-2"
        >
          <template #icon>
            <AppNavIcon> 👨‍👨‍👧‍👦 </AppNavIcon>
          </template>
        </AppNavButton>
      </div>

      <div class="flex flex-col">
        <AppNavButton
          to="/logs"
          label="Logs"
          :condensed="collapsed"
          class="mb-2"
        >
          <template #icon>
            <AppNavIcon>🪵</AppNavIcon>
          </template>
        </AppNavButton>
        <AppNavButton to="/settings" label="Settings" :condensed="collapsed">
          <template #icon>
            <AppNavIcon>⚙️</AppNavIcon>
          </template>
        </AppNavButton>
      </div>

      <button
        ref="buttonRef"
        class="absolute -right-12 bottom-0 box-border flex h-14 w-12 items-center justify-center rounded-br-full rounded-tr-full bg-zinc-200 bg-gradient-to-r font-bold text-black sm:from-zinc-100 sm:from-20% sm:to-zinc-300 dark:bg-zinc-950 dark:text-white sm:dark:from-zinc-900 sm:dark:to-zinc-800"
        @click="toggleSidebar"
      >
        <ClientOnly>
          <SvgCaretDown
            :dark-mode="false"
            class="h-5 w-5"
            :class="[{ '-rotate-90': collapsed }, { 'rotate-90': !collapsed }]"
          />
          <template #fallback>
            <SvgCaretDown
              class="h-5 w-5"
              :class="[
                { '-rotate-90': collapsed },
                { 'rotate-90': !collapsed },
              ]"
            />
          </template>
        </ClientOnly>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const collapsed = defineModel("collapsed", {
  type: Boolean,
  default: false,
  required: true,
});
const hidden = defineModel("hidden", {
  type: Boolean,
  default: false,
  required: true,
});

const buttonRef = ref<HTMLElement | null>(null);
const onLongPressCallback = () => {
  hidden.value = true;
};

onLongPress(buttonRef, onLongPressCallback, {
  modifiers: { prevent: true },
  delay: 300,
});

const toggleSidebar = () => {
  if (hidden.value) {
    collapsed.value = true;
    hidden.value = false;
  } else {
    collapsed.value = !collapsed.value;
  }
};
</script>
