import { parse } from "valibot";
import { ActivitySelect } from "~/db/models";
import {
  activityFormSchema,
  ActivityFormType,
} from "~/schemas/activityForm.schema";
import { activityFormInsert } from "~/services";

const bodySchema = activityFormSchema;

export default defineEventHandler<
  { body: ActivityFormType },
  Promise<ActivitySelect>
>(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    parse(bodySchema, body),
  );
  // Get the context from our middleware
  const id = event.context.user;
  if (!id) throw createError("You are not authenticated");

  return await activityFormInsert(body);
});
