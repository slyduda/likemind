import { defineStore, skipHydrate } from "pinia";

export const useMainStore = defineStore("main", () => {
  const darkMode = ref(useLocalStorage("main.darkMode", false));
  const collapsedSidebar = ref(true);

  return {
    collapsedSidebar: collapsedSidebar,
    darkMode: skipHydrate(darkMode),
  };
});
