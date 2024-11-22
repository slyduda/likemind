import {
  useActivityReviewFactory,
  useActivityFactory,
  useActivityTagFactory,
  useEntityFactory,
  useInvolvementFactory,
  useRelationshipReviewFactory,
  useTagFactory,
  useUserFactory,
  useEvidenceFactory,
  useRelationshipFactory,
  useRelationshipArcFactory,
  useInvolvementReviewFactory,
  useRelationshipEvidenceFactory,
  useInvolvementEvidenceFactory,
  useActivityEvidenceFactory,
} from "@/db/factories";
import type {
  EntityFactoryCreate,
  ActivityFactoryCreate,
  InvolvementFactoryCreate,
  TagFactoryCreate,
  ActivityTagFactoryCreate,
  RelationshipReviewFactoryCreate,
  UserFactoryCreate,
  EvidenceFactoryCreate,
  RelationshipFactoryCreate,
  InvolvementReviewFactoryCreate,
  RelationshipArcFactoryCreate,
  ActivityReviewFactoryCreate,
  ActivityEvidenceFactoryCreate,
  InvolvementEvidenceFactoryCreate,
  RelationshipEvidenceFactoryCreate,
} from "@/db/factories";
import {
  clearTables,
  activityInsertMany,
  activityReviewInsertMany,
  activityTagInsertMany,
  entityInsertMany,
  evidenceInsertMany,
  involvementInsertMany,
  involvementReviewInsertMany,
  relationshipArcInsertMany,
  relationshipInsertMany,
  relationshipReviewInsertMany,
  tagInsertMany,
  userInsertMany,
  relationshipEvidenceInsertMany,
  activityEvidenceInsertMany,
  involvementEvidenceInsertMany,
} from "@/services";
import { faker } from "@faker-js/faker";
import { randomNonCollidingIndices, randomWeightedValue } from "@/utils";
import { DemoLoadServiceConstants } from "@/schemas/demo.schema";

export const loadDemo = async (options?: {
  entityCount?: number;
  activityCount?: number;
  evidenceCount?: number;
  tagCount?: number;
  relationshipCount?: number;
  userCount?: number;
}) => {
  const {
    entityCount = DemoLoadServiceConstants.entityCount.default,
    activityCount = DemoLoadServiceConstants.activityCount.default,
    evidenceCount = DemoLoadServiceConstants.evidenceCount.default,
    tagCount = DemoLoadServiceConstants.tagCount.default,
    relationshipCount = DemoLoadServiceConstants.relationshipCount.default,
    userCount = DemoLoadServiceConstants.userCount.default,
  } = options ?? {};

  faker.seed(5432);
  await clearTables();

  const activityFactory = useActivityFactory();
  const activityEvidenceFactory = useActivityEvidenceFactory();
  const activityReviewFactory = useActivityReviewFactory();
  const activityTagFactory = useActivityTagFactory();

  const entityFactory = useEntityFactory();
  const evidenceFactory = useEvidenceFactory();

  const relationshipFactory = useRelationshipFactory();
  const relationshipArcFactory = useRelationshipArcFactory();
  const relationshipEvidenceFactory = useRelationshipEvidenceFactory();
  const relationshipReviewFactory = useRelationshipReviewFactory();

  const involvementFactory = useInvolvementFactory();
  const involvementEvidenceFactory = useInvolvementEvidenceFactory();
  const involvementReviewFactory = useInvolvementReviewFactory();

  const tagFactory = useTagFactory();
  const userFactory = useUserFactory();

  const entities: EntityFactoryCreate[] = [];
  const evidences: EvidenceFactoryCreate[] = [];

  const activities: ActivityFactoryCreate[] = [];
  const activityTags: ActivityTagFactoryCreate[] = [];
  const activityEvidences: ActivityEvidenceFactoryCreate[] = [];
  const activityReviews: ActivityReviewFactoryCreate[] = [];

  const involvements: InvolvementFactoryCreate[] = [];
  const involvementEvidences: InvolvementEvidenceFactoryCreate[] = [];
  const involvementReviews: InvolvementReviewFactoryCreate[] = [];

  const tags: TagFactoryCreate[] = [];

  const relationships: RelationshipFactoryCreate[] = [];
  const relationshipEvidences: RelationshipEvidenceFactoryCreate[] = [];
  const relationshipArcs: RelationshipArcFactoryCreate[] = [];
  const relationshipReviews: RelationshipReviewFactoryCreate[] = [];

  const users: UserFactoryCreate[] = [];

  for (let i = 0; i < entityCount; i++) {
    const entity = await entityFactory.create();
    entities.push(entity);
  }
  await entityInsertMany(entities);

  for (let i = 0; i < userCount; i++) {
    const user = await userFactory.create();
    users.push(user);
  }
  await userInsertMany(users);

  for (let i = 0; i < evidenceCount; i++) {
    const user = await evidenceFactory.create();
    evidences.push(user);
  }
  await evidenceInsertMany(evidences);

  for (let i = 0; i < relationshipCount; i++) {
    const relationship = await relationshipFactory.create();
    relationships.push(relationship);

    const [evidenceIndex] = randomNonCollidingIndices(evidences.length, 1);
    const evidence = evidences[evidenceIndex];

    const relationshipEvidence = await relationshipEvidenceFactory.create({
      relationshipId: relationship.id,
      evidenceId: evidence.id,
    });
    relationshipEvidences.push(relationshipEvidence);

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
  await relationshipEvidenceInsertMany(relationshipEvidences);
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

    // Add the activity evidences
    const [evidenceIndex] = randomNonCollidingIndices(evidences.length, 1);
    const evidence = evidences[evidenceIndex];

    const activityEvidence = await activityEvidenceFactory.create({
      activityId: activity.id,
      evidenceId: evidence.id,
    });
    activityEvidences.push(activityEvidence);

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

    // Create the Relationship Reviews
    const [userIndex] = randomNonCollidingIndices(users.length, 1);
    const user = users[userIndex];

    const activityReview = await activityReviewFactory.create({
      userId: user.id,
      activityId: activity.id,
    });
    activityReviews.push(activityReview);

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

      // Add involvement evidences
      const [evidenceIndex] = randomNonCollidingIndices(evidences.length, 1);
      const evidence = evidences[evidenceIndex];

      const involvementEvidence = await involvementEvidenceFactory.create({
        involvementId: involvement.id,
        evidenceId: evidence.id,
      });
      involvementEvidences.push(involvementEvidence);

      // Add involvement reviews
      const involvementReview = await involvementReviewFactory.create({
        userId: user.id,
        involvementId: involvement.id,
      });
      involvementReviews.push(involvementReview);
    }
  }
  await activityInsertMany(activities);
  await activityTagInsertMany(activityTags);
  await activityEvidenceInsertMany(activityEvidences);
  await activityReviewInsertMany(activityReviews);

  await involvementInsertMany(involvements);
  await involvementEvidenceInsertMany(involvementEvidences);
  await involvementReviewInsertMany(involvementReviews);
};
