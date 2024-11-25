import { maxValue, minValue, number, object, optional, pipe } from "valibot";

export const DemoLoadServiceConstants = {
  entityCount: { min: 20, max: 200, default: 80 },
  activityCount: { min: 20, max: 400, default: 200 },
  evidenceCount: { min: 20, max: 400, default: 200 },
  tagCount: { min: 20, max: 100, default: 30 },
  relationshipCount: { min: 20, max: 200, default: 100 },
  userCount: { min: 1, max: 20, default: 3 },
};

export const entityCountSchema = pipe(
  number(),
  minValue(DemoLoadServiceConstants.entityCount.min),
  maxValue(DemoLoadServiceConstants.entityCount.max),
);
export const evidenceCountSchema = pipe(
  number(),
  minValue(DemoLoadServiceConstants.evidenceCount.min),
  maxValue(DemoLoadServiceConstants.evidenceCount.max),
);
export const activityCountSchema = pipe(
  number(),
  minValue(DemoLoadServiceConstants.activityCount.min),
  maxValue(DemoLoadServiceConstants.activityCount.max),
);
export const tagCountSchema = pipe(
  number(),
  minValue(DemoLoadServiceConstants.tagCount.min),
  maxValue(DemoLoadServiceConstants.tagCount.max),
);
export const relationshipCountSchema = pipe(
  number(),
  minValue(DemoLoadServiceConstants.relationshipCount.min),
  maxValue(DemoLoadServiceConstants.relationshipCount.max),
);
export const userCountSchema = pipe(
  number(),
  minValue(DemoLoadServiceConstants.userCount.min),
  maxValue(DemoLoadServiceConstants.userCount.max),
);

export const demoSchema = object({
  entityCount: optional(
    entityCountSchema,
    DemoLoadServiceConstants.entityCount.default,
  ),
  evidenceCount: optional(
    evidenceCountSchema,
    DemoLoadServiceConstants.evidenceCount.default,
  ),
  activityCount: optional(
    activityCountSchema,
    DemoLoadServiceConstants.activityCount.default,
  ),
  tagCount: optional(tagCountSchema, DemoLoadServiceConstants.tagCount.default),
  relationshipCount: optional(
    relationshipCountSchema,
    DemoLoadServiceConstants.relationshipCount.default,
  ),
  userCount: optional(
    userCountSchema,
    DemoLoadServiceConstants.userCount.default,
  ),
});
