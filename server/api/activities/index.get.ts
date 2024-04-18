import { activityList } from "~/db/services/activity/activityList";

export default defineEventHandler(
  async () => await activityList({ limit: 100, offset: 0 }),
);
