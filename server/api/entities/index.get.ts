import { entityList } from "~/db/services/entity/entityList";

export default defineEventHandler(
  async () => await entityList({ limit: 100, offset: 0 })
);
