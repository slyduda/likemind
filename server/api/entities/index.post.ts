import { parse } from "valibot";
import { entityInsert } from "~/services/entity/entityInsert";
import {
  EntityCreateInputSchema,
  EntityReadSchema,
  entityCreateSchema,
  entityReadSchema,
} from "~/schemas/entity.schema";

export default defineEventHandler<
  { body: EntityCreateInputSchema },
  Promise<EntityReadSchema>
>(async (event) => {
  // Get the user id from the context from our middleware
  const userId = event.context.user;
  if (!userId) throw Error("You are not authenticated");

  // Get the body and validate
  const body = await readBody(event);
  const entity = parse(entityCreateSchema, body);

  // Do the insert on the db
  const newEntity = await entityInsert(entity);
  if (!newEntity) throw Error("Error creating Entity");

  // Parse and return
  const paredEntity = parse(entityReadSchema, newEntity);
  return paredEntity;
});
