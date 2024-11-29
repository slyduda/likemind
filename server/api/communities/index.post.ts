import { parse } from "valibot";
import { communityInsert } from "~/services/community/communityInsert";
import {
  CommunityCreateInputSchema,
  CommunityReadSchema,
  communityCreateSchema,
  communityReadSchema,
} from "~/schemas/community.schema";

export default defineEventHandler<
  { body: CommunityCreateInputSchema },
  Promise<CommunityReadSchema>
>(async (event) => {
  // Get the context from our middleware
  const id = event.context.user;
  if (!id) throw createError("You are not authenticated");

  // Get the body and validate
  const body = await readBody(event);
  const community = parse(communityCreateSchema, body);

  // Do the insert on the db
  const newCommunity = await communityInsert(community);
  if (!newCommunity) throw createError("Error creating Community");

  // Parse and return
  const paredCommunity = parse(communityReadSchema, newCommunity);
  return paredCommunity;
});
