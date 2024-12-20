import { db } from "@/db";
import { entity } from "@/db/models";
import { ilike, inArray } from "drizzle-orm";

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
  name?: string;
  limit: number;
  offset: number;
}) => {
  const query = db.select().from(entity).limit(limit).offset(offset);

  if (name) {
    query.where(ilike(entity.name, `%${name}%`));
  }

  return await query;
};

export const entityListByIds = async (ids: string[]) => {
  if (ids.length === 0) return [];
  const query = db
    .select()
    .from(entity)
    .where(inArray(entity.id, ids))
    .limit(100)
    .offset(0);

  return await query;
};
