import { entityList } from "~/services";

export default defineEventHandler(
  async () => await entityList({ limit: 100, offset: 0 }),
);
