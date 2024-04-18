import { communityList } from "~/db/services/community/communityList";

export default defineEventHandler(
  async () => await communityList({ limit: 100, offset: 0 }),
);
