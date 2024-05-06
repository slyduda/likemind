import { boolean, object, optional, parse } from "valibot";
import { clearTables } from "~/db/services";

const clearSchema = object({
  fake: optional(boolean(), true),
});

const deleteDataClearBodySchema = optional(clearSchema, {
  fake: true,
});

export default defineEventHandler<
  { body: typeof deleteDataClearBodySchema },
  Promise<void>
>(async (event) => {
  const body = await readValidatedBody(event, async () =>
    parse(deleteDataClearBodySchema, await readBody(event)),
  );
  await clearTables({ fake: body.fake });
  return;
});
