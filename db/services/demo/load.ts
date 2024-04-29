import {
  useActivityFactory,
  useActivityTagFactory,
  useEntityFactory,
  useInvolvementFactory,
  useRelationshipReviewFactory,
  useTagFactory,
  useUserFactory,
  type EntityFactoryCreate,
  type ActivityFactoryCreate,
  type InvolvementFactoryCreate,
  type TagFactoryCreate,
  type ActivityTagFactoryCreate,
  type RelationshipReviewFactoryCreate,
  type UserFactoryCreate,
} from "@/db/factories";
import { clearTables } from ".";
import { faker } from "@faker-js/faker";

import { randomNonCollidingIndices, randomWeightedValue } from "@/utils";
import {
  useRelationshipFactory,
  type RelationshipFactoryCreate,
} from "~/db/factories/relationship.factory";
import {
  useRelationshipArcFactory,
  type RelationshipArcFactoryCreate,
} from "~/db/factories/relationshipArc.factory";
import { DemoLoadServiceConstants } from "~/schemas/demo.schema";
import {
  activityInsertMany,
  activityTagInsertMany,
  entityInsertMany,
  involvementInsertMany,
  relationshipArcInsertMany,
  relationshipInsertMany,
  relationshipReviewInsertMany,
  tagInsertMany,
  userInsertMany,
} from "..";

export const loadDemo = async (options?: {
  entityCount?: number;
  activityCount?: number;
  tagCount?: number;
  relationshipCount?: number;
  userCount?: number;
}) => {
  const {
    entityCount = DemoLoadServiceConstants.entityCount.default,
    activityCount = DemoLoadServiceConstants.activityCount.default,
    tagCount = DemoLoadServiceConstants.tagCount.default,
    relationshipCount = DemoLoadServiceConstants.relationshipCount.default,
    userCount = DemoLoadServiceConstants.userCount.default,
  } = options ?? {
    entityCount: DemoLoadServiceConstants.entityCount.default,
    activityCount: DemoLoadServiceConstants.activityCount.default,
    tagCount: DemoLoadServiceConstants.tagCount.default,
    relationshipCount: DemoLoadServiceConstants.relationshipCount.default,
    userCount: DemoLoadServiceConstants.userCount.default,
  };

  faker.seed(5432);
  await clearTables();

  const entityFactory = useEntityFactory();
  const relationshipFactory = useRelationshipFactory();
  const relationshipArcFactory = useRelationshipArcFactory();
  const activityFactory = useActivityFactory();
  const involvementFactory = useInvolvementFactory();
  const tagFactory = useTagFactory();
  const activityTagFactory = useActivityTagFactory();
  const userFactory = useUserFactory();
  const relationshipReviewFactory = useRelationshipReviewFactory();

  const entities: EntityFactoryCreate[] = [];
  const activities: ActivityFactoryCreate[] = [];
  const involvements: InvolvementFactoryCreate[] = [];
  const tags: TagFactoryCreate[] = [];
  const activityTags: ActivityTagFactoryCreate[] = [];
  const relationships: RelationshipFactoryCreate[] = [];
  const relationshipArcs: RelationshipArcFactoryCreate[] = [];
  const relationshipReviews: RelationshipReviewFactoryCreate[] = [];
  const users: UserFactoryCreate[] = [];

  for (let i = 0; i < entityCount; i++) {
    const entity = await entityFactory.create();
    entities.push(entity);
  }
  await entityInsertMany(entities);

  for (let i = 0; i < userCount; i++) {
    const user =
      i !== 0
        ? await userFactory.create()
        : await userFactory.create({
            handle: "slyduda",
            email: "me@slyduda.com",
            password: "possword",
          });
    users.push(user);
  }
  await userInsertMany(users);

  for (let i = 0; i < relationshipCount; i++) {
    const relationship = await relationshipFactory.create();
    relationships.push(relationship);

    const [entityAIndex, entityBIndex] = randomNonCollidingIndices(
      entities.length,
      2,
    );
    const entityA = entities[entityAIndex];
    const entityB = entities[entityBIndex];
    const relationshipArc1 = await relationshipArcFactory.create({
      relationshipId: relationship.id,
      startEntityId: entityA.id,
      endEntityId: entityB.id,
    });
    const relationshipArc2 = await relationshipArcFactory.create({
      relationshipId: relationship.id,
      startEntityId: entityB.id,
      endEntityId: entityA.id,
    });
    relationshipArcs.push(relationshipArc1, relationshipArc2);

    // Create the Relationship Reviews
    const [userIndex] = randomNonCollidingIndices(users.length, 1);
    const user = users[userIndex];
    const relationshipReview = await relationshipReviewFactory.create({
      userId: user.id,
      relationshipId: relationship.id,
    });
    relationshipReviews.push(relationshipReview);
  }
  await relationshipInsertMany(relationships);
  await relationshipArcInsertMany(relationshipArcs);
  await relationshipReviewInsertMany(relationshipReviews);

  for (let i = 0; i < tagCount; i++) {
    const tag = await tagFactory.create();
    tags.push(tag);
  }
  await tagInsertMany(tags);

  for (let i = 0; i < activityCount; i++) {
    // Create an activity
    const activity = await activityFactory.create();
    activities.push(activity);

    // Associate the activity with one or more tags
    const assignedTagCount = randomWeightedValue(1, tags.length, [1, 1, 5, 2]);

    const assignedTagIndices = randomNonCollidingIndices(
      tags.length,
      assignedTagCount,
    );

    // Loop over all associated tags
    for (let j = 0; j < assignedTagIndices.length; j++) {
      const tagIndex = assignedTagIndices[j];
      const tag = tags[tagIndex];

      // Create the involvement
      const activityTag = await activityTagFactory.create({
        activityId: activity.id,
        tagName: tag.name,
      });
      activityTags.push(activityTag);
    }

    // Associate the activity with one or more entities
    const involvedEntityCount = randomWeightedValue(
      1,
      entities.length,
      [1, 2, 1, 0.5],
    );

    const involvedEntityIndices = randomNonCollidingIndices(
      entities.length,
      involvedEntityCount,
    );

    // Loop over all involved entities
    for (let j = 0; j < involvedEntityIndices.length; j++) {
      const entityIndex = involvedEntityIndices[j];
      const entity = entities[entityIndex];

      // Create the involvement
      const involvement = await involvementFactory.create({
        activityId: activity.id,
        entityId: entity.id,
      });
      involvements.push(involvement);
    }
  }
  await activityInsertMany(activities);
  await activityTagInsertMany(activityTags);
  await involvementInsertMany(involvements);
};
