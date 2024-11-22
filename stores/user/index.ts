import { defineStore, skipHydrate } from "pinia";
import type { UserReadSchema } from "@/schemas/user.schema";

export const useUserStore = defineStore("user", () => {
  const account = ref(
    useLocalStorage<UserReadSchema | null>("user.account", null),
  );

  return { account: skipHydrate(account) };
});
