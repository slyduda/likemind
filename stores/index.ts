import { defineStore, skipHydrate } from "pinia";

type AcknowledgementMap = {
  [id: string]: Acknowledgement;
};

export type AcknowledgementType = "AUTO" | "MANUAL";

export interface Acknowledgement {
  id: string;
  type: AcknowledgementType;
  created_at: string;
}

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
