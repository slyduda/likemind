import { eq } from "drizzle-orm";
import { db } from "@/db";
import { subject, user } from "@/db/models";

export const userById = async ({ id }: { id: string }) => {
  const users = await db.select().from(user).where(eq(user.id, id));
  return users.length ? users[0] : null;
};

export const userByHandle = async ({ handle }: { handle: string }) => {
  const users = await db.select().from(user).where(eq(user.handle, handle));
  return users.length ? users[0] : null;
};

export const userByNativeEmail = async ({ email }: { email: string }) => {
  const users = await db
    .select()
    .from(user)
    .innerJoin(subject, eq(user.id, subject.userId))
    .where(eq(subject.email, email));
  return users.length ? users[0] : null;
};
