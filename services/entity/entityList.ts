import { db } from "@/db";
import { entity } from "@/db/models";
import { eq } from "drizzle-orm";

export const entityList = async ({
  limit = 100,
  offset = 0,
}: {
  limit: number;
  offset: number;
}) => {
  return await db.select().from(entity).limit(limit).offset(offset);
};

export const entityListByName = async ({
  name,
  limit = 100,
  offset = 0,
}: {
  name: string;
  limit: number;
  offset: number;
}) => {
  return await db
    .select()
    .from(entity)
    .where(eq(entity.name, name))
    .limit(limit)
    .offset(offset);
};
