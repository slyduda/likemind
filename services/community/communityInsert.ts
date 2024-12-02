import { db } from "@/db";
import { community, type CommunityInsert } from "@/db/models";

export const communityInsert = async (insert: CommunityInsert) => {
  const communities = await db.insert(community).values(insert).returning();
  return communities[0];
};

export const communityInsertMany = async (insert: CommunityInsert[]) => {
  if (insert.length === 0) return [];
  const communities = await db.insert(community).values(insert).returning();
  return communities;
};
