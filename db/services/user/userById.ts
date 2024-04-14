import { eq } from "drizzle-orm";
import { db } from "~/db";
import { user } from "@/db/models";

export const userById = async ({id}: {id: string}) => {
  const users = await db.select().from(user).where(eq(user.id, id))
  return users ? users[0] : null
};

export const userByHandle = async ({handle}: {handle: string}) => {
  const users = await db.select().from(user).where(eq(user.handle, handle))
  return users ? users[0] : null
};
