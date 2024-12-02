import { db } from "@/db";
import {
  activity,
  type ActivityInsert,
  type EntitySelect,
  type EvidenceSelect,
  type InvolvementEvidenceInsert,
  type TagSelect,
} from "@/db/models";
import type { ActivityFormType } from "~/schemas/activityForm.schema";
import { evidenceInsertMany } from "../evidence";
import { entityInsertMany, entityListByIds } from "../entity";
import { tagInsertMany, tagListByIds } from "../tag";
import { activityEvidenceInsertMany } from "../activityEvidence";
import { involvementEvidenceInsertMany } from "../involvementEvidence";
import { activityTagInsertMany } from "../activityTag";
import { involvementInsertMany } from "../involvement";
import { filterInsert, filterSelect } from "@/utils";

export const activityInsert = async (insert: ActivityInsert) => {
  const activities = await db.insert(activity).values(insert).returning();
  return activities[0];
};

export const activityInsertMany = async (insert: ActivityInsert[]) => {
  if (insert.length === 0) return [];
  const activities = await db.insert(activity).values(insert).returning();
  return activities;
};

export const activityFormInsert = async (insert: ActivityFormType) => {
  const evidences: EvidenceSelect[] = [];
  const entities: EntitySelect[] = [];
  const tags: TagSelect[] = [];

  const entitiesToInsert = filterInsert(insert.entities);
  const entitiesToSelect = filterSelect(insert.entities);

  const tagsToInsert = filterInsert(insert.tags);
  const tagsToSelect = filterSelect(insert.tags);

  const evidencesCreated = await evidenceInsertMany(
    insert.sources.map((source) => ({
      source: source.url,
      description: source.article ?? "",
    })),
  );

  evidences.push(...evidencesCreated);

  const entitiesInserted = await entityInsertMany(
    entitiesToInsert.map((entity) => ({
      name: entity.name,
    })),
  );
  const entitiesSelected = await entityListByIds(
    entitiesToSelect.map((entity) => entity.id),
  );

  entities.push(...entitiesInserted, ...entitiesSelected);

  const tagsInserted = await tagInsertMany(
    tagsToInsert.map((tag) => ({
      name: tag.name,
    })),
  );

  const tagsSelected = await tagListByIds(tagsToSelect.map((tag) => tag.id));

  tags.push(...tagsInserted, ...tagsSelected);

  const activityToInsert: ActivityInsert = {
    startedAt: insert.startedAt,
    endedAt: insert.endedAt,
    description: insert.description,
  };

  const activity = await activityInsert(activityToInsert);

  const activityEvidencesToInsert = evidences.map((evidence) => ({
    activityId: activity.id,
    evidenceId: evidence.id,
  }));
  const activityTagsToInsert = tags.map((tag) => ({
    tagName: tag.name,
    activityId: activity.id,
  }));

  const involvementsToInsert = entities.map((entity) => ({
    description: "",
    entityId: entity.id,
    activityId: activity.id,
  }));

  await activityEvidenceInsertMany(activityEvidencesToInsert);
  await activityTagInsertMany(activityTagsToInsert);
  const involvements = await involvementInsertMany(involvementsToInsert);

  const involvementEvidences: InvolvementEvidenceInsert[] = [];

  for (const involvement of involvements) {
    involvementEvidences.push(
      ...evidences.map((evidence) => ({
        evidenceId: evidence.id,
        involvementId: involvement.id,
      })),
    );
  }

  await involvementEvidenceInsertMany(involvementEvidences);

  return activity;
};
