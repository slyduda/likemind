import { db } from "@/db";
import { tag } from "@/db/models";
import { ilike, inArray } from "drizzle-orm";

export const tagList = async ({
  limit = 100,
  offset = 0,
}: {
  limit: number;
  offset: number;
}) => {
  return await db.select().from(tag).limit(limit).offset(offset);
};

export const tagListByName = async ({
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
    .from(tag)
    .where(ilike(tag.name, `%${name}%`))
    .limit(limit)
    .offset(offset);
};

export const tagListByIds = async (ids: string[]) => {
  if (ids.length === 0) return [];
  const query = db
    .select()
    .from(tag)
    .where(inArray(tag.id, ids))
    .limit(100)
    .offset(0);

  return await query;
};
