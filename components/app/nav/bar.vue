<template>
  <div
    class="absolute top-0 z-[51] bg-zinc-200 sm:relative dark:bg-stone-950"
    :class="[
      { 'left-0 sm:p-2': !hidden },
      { '-left-16 sm:-left-20 sm:w-0': hidden },
    ]"
  >
    <div
      class="relative z-20 flex h-full flex-col justify-between bg-zinc-200 py-3 sm:rounded-xl sm:rounded-br-none sm:bg-zinc-100 dark:bg-stone-950 sm:dark:bg-stone-900"
      :class="[
        { 'px-3': !hidden },
        { 'w-44': !collapsed && !hidden },
        { 'w-16': collapsed && !hidden },
        { 'w-0 px-0': hidden },
      ]"
    >
      <div class="flex flex-col">
        <AppNavButton to="/" label="Home" :condensed="collapsed" class="mb-2">
          <template #icon>
            <AppNavIcon>
              <Icon
                name="solar:home-smile-bold-duotone"
                class="h-full w-full"
              ></Icon>
            </AppNavIcon>
          </template>
        </AppNavButton>
        <AppNavButton
          :to="`/entities`"
          label="Entities"
          :condensed="collapsed"
          class="mb-2"
        >
          <template #icon>
            <AppNavIcon>
              <Icon
                name="solar:buildings-bold-duotone"
                class="h-full w-full"
              ></Icon>
            </AppNavIcon>
          </template>
        </AppNavButton>
        <AppNavButton
          :to="`/activities`"
          label="Activities"
          :condensed="collapsed"
          class="mb-2"
        >
          <template #icon>
            <AppNavIcon>
              <Icon
                name="solar:calendar-search-bold-duotone"
                class="h-full w-full"
              ></Icon>
            </AppNavIcon>
          </template>
        </AppNavButton>
        <AppNavButton
          to="/communities"
          label="Communities"
          :condensed="collapsed"
          class="mb-2"
        >
          <template #icon>
            <AppNavIcon>
              <Icon
                name="solar:people-nearby-bold-duotone"
                class="h-full w-full"
              ></Icon>
            </AppNavIcon>
          </template>
        </AppNavButton>
      </div>

      <div class="flex flex-col">
        <AppNavButton
          to="https://ko-fi.com/slyduda"
          target="_blank"
          label="Buy Me a Ko-Fi"
          :condensed="collapsed"
          class="mb-2"
        >
          <template #icon>
            <AppNavIcon>
              <Icon class="h-6 w-6" name="solar:cup-paper-bold-duotone"></Icon>
            </AppNavIcon>
          </template>
        </AppNavButton>
        <AppNavButton to="/settings" label="Settings" :condensed="collapsed">
          <template #icon>
            <AppNavIcon>
              <Icon class="h-6 w-6" name="solar:settings-bold-duotone"></Icon>
            </AppNavIcon>
          </template>
        </AppNavButton>
      </div>

      <button
        ref="buttonRef"
        class="noselect absolute bottom-0 box-border flex h-14 w-12 items-center justify-center rounded-br-full rounded-tr-full bg-zinc-200 bg-gradient-to-r font-bold text-black sm:from-zinc-100 sm:to-zinc-200 dark:bg-stone-950 dark:to-zinc-800 sm:dark:from-zinc-900"
        :class="[
          { '-right-28 sm:-right-32': hidden },
          { '-right-12': !hidden },
        ]"
        stone
        @click="toggleSidebar"
      >
        <Icon
          name="solar:sidebar-minimalistic-bold-duotone"
          :dark-mode="false"
          class="h-6 w-6"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

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

const { account } = useUserStore();

const holdMute = useState("holdMute", () => false);

const buttonRef = ref<HTMLElement | null>(null);
const onLongPressCallback = () => {
  if (collapsed.value) hidden.value = true;
  holdMute.value = true;
};

onLongPress(buttonRef, onLongPressCallback, {
  modifiers: { prevent: true },
  delay: 800,
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

<style>
.noselect {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -khtml-user-select: none;
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Old versions of Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
