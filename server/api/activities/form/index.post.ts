import { parse } from "valibot";
import {
  activityFormSchema,
  ActivityFormType,
} from "~/schemas/activityForm.schema";

const bodySchema = activityFormSchema;

export default defineEventHandler<{ body: ActivityFormType }, Promise<void>>(
  async (event) => {
    console.log(await readBody(event));
    const body = await readValidatedBody(event, (body) =>
      parse(bodySchema, body),
    );
    // Get the context from our middleware
    const id = event.context.user;
    if (!id) throw createError("You are not authenticated");

    console.log(body);
  },
);
