import { entityList } from "@/db/services";

export default defineEventHandler(
  async () => await entityList({ limit: 100, offset: 0 }),
);
