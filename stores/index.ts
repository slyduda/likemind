import { defineStore, skipHydrate } from "pinia";
import type { AcknowledgementMap } from "@/@types";

export const useMainStore = defineStore("main", () => {
  const darkMode = ref(useLocalStorage("main.darkMode", false));
  const collapsedSidebar = ref(true);
  const messages = ref(useLocalStorage<Message[]>("main.messages", []));
  const acknowledgements = ref(
    useLocalStorage<AcknowledgementMap>("main.acknowledgements", {}),
  );

  return {
    acknowledgements: skipHydrate(acknowledgements),
    messages: skipHydrate(messages),
    collapsedSidebar: collapsedSidebar,
    darkMode: skipHydrate(darkMode),
  };
});
