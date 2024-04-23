import { clearTables } from "~/db/services";

export default defineEventHandler(async () => {
  await clearTables();
  return;
});
