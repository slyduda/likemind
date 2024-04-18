import { eq } from "drizzle-orm";
import { db } from "~/db";
import { entity } from "@/db/models";

export const entityById = async ({ id }: { id: string }) => {
  const entitys = await db.select().from(entity).where(eq(entity.id, id));
  return entitys.length ? entitys[0] : null;
};
