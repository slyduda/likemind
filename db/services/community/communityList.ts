import { db } from "@/db";
import { community } from "@/db/models";

export const communityList = async ({
  limit = 100,
  offset = 0,
}: {
  limit: number;
  offset: number;
}) => {
  return await db.select().from(community).limit(limit).offset(offset);
};
