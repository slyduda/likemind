import { useUserStore } from "~/stores/user";
import { v4 as uuidv4 } from "uuid";

export default defineNuxtRouteMiddleware(async () => {
  // Skip middleware on server since it doesn't have access to state
  if (import.meta.server) {
    return;
  }

  const userStore = useUserStore();
  const mainStore = useMainStore();

  try {
    const response = await $fetch("/api/users");
    userStore.account = response;
    mainStore.messages.push({
      id: uuidv4(),
      type: "SUCCESS",
      base_url: "/",
      path: "/login",
      method: "GET",
      created_at: new Date().toISOString(),
      status: 204,
      payload: {},
      body: null,
    });
    return navigateTo("/");
  } catch (error) {
    userStore.account = null;
  }
});
