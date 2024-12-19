import { db } from "@/db";
import {
  subject,
  user,
  type SubjectInsert,
  type UserInsert,
} from "@/db/models";

export const userNativeSignup = async (
  subjectInsert: SubjectInsert,
  userInsert: UserInsert,
) => {
  const subjects = await db.insert(subject).values(subjectInsert).returning();
  if (!subjects.length) return;
  const users = await db.insert(user).values(userInsert).returning();
  return users[0];
};

export const userInsert = async (insert: UserInsert) => {
  const users = await db.insert(user).values(insert).returning();
  return users[0];
};

export const userInsertMany = async (insert: UserInsert[]) => {
  if (insert.length === 0) return [];
  const users = await db.insert(user).values(insert).returning();
  return users;
};
