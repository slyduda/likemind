import { loadDemo } from "~/db/services";

export default defineEventHandler(async () => {
  await loadDemo();
  return;
});
