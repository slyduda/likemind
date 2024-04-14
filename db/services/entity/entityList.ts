import { db } from "@/db";
import { entity } from "@/db/models";

export const entityList = async ({
  limit = 100,
  offset = 0,
}: {
  limit: number;
  offset: number;
}) => {
  return await db.select().from(entity).limit(limit).offset(offset);
};
