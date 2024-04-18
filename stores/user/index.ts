import { defineStore } from "pinia";
import type { UserReadSchema } from "~/schemas/user.schema";

export const useUserStore = defineStore("user", () => {
  const account = ref<UserReadSchema | null>(null);

  return { account };
});
