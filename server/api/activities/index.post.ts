import { parse } from "valibot";
import { activityInsert } from "~/services/activity/activityInsert";
import {
  ActivityCreateInputSchema,
  ActivityReadSchema,
  activityCreateSchema,
  activityReadSchema,
} from "~/schemas/activity.schema";

export default defineEventHandler<
  { body: ActivityCreateInputSchema },
  Promise<ActivityReadSchema>
>(async (event) => {
  // Get the context from our middleware
  const id = event.context.user;
  if (!id) throw createError("You are not authenticated");

  // Get the body and validate
  const body = await readBody(event);
  const activity = parse(activityCreateSchema, body);

  // Do the insert on the db
  const newActivity = await activityInsert(activity);
  if (!newActivity) throw createError("Error creating Activity");

  // Parse and return
  const parsedActivity = parse(activityReadSchema, newActivity);
  return parsedActivity;
});
