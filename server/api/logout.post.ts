import { useUserStore } from "~/stores/user";

export default defineEventHandler(async (event) => {
  const userStore = useUserStore();

  deleteCookie(event, "access_token");
  userStore.account = null;

  return;
});
