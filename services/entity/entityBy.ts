import { and, count, desc, eq, inArray, or, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  entity,
  relationship,
  relationshipArc,
  relationshipReview,
  type EntitySelect,
} from "@/db/models";
import { alias } from "drizzle-orm/pg-core";

export const entityById = async ({ id }: { id: string }) => {
  const entitys = await db.select().from(entity).where(eq(entity.id, id));
  return entitys.length ? entitys[0] : null;
};

export interface RelatedEntityRead extends EntitySelect {
  reviewCount: number;
  relationshipSignificance: number;
}
export interface EntityComplexRead extends EntitySelect {
  relatedEntities: RelatedEntityRead[];
}

const relatedEntity = alias(entity, "related_entity");

export const entityComplexById = async ({
  id,
  depth = 1,
}: {
  id: string;
  depth: number;
}) => {
  const entities = await db
    .select({
      entity,
      relatedEntity,
      relationshipSignificance: sql<number>`COALESCE(avg(relationship_review.significance), 0) as avg_significance`,
      reviewCount: sql<number>`count(relationship_review.significance) as review_count`,
    })
    .from(entity)
    .innerJoin(
      relationshipArc,
      or(
        eq(entity.id, relationshipArc.startEntityId),
        // eq(entity.id, relationshipArc.endEntityId),
      ),
    )
    .innerJoin(
      relationship,
      eq(relationshipArc.relationshipId, relationship.id),
    )
    .leftJoin(
      relationshipReview,
      eq(relationship.id, relationshipReview.relationshipId),
    )
    .innerJoin(
      relatedEntity,
      or(
        and(
          eq(relationshipArc.startEntityId, entity.id),
          eq(relationshipArc.endEntityId, relatedEntity.id),
        ),
        // and(
        //   eq(relationshipArc.endEntityId, entity.id),
        //   eq(relationshipArc.startEntityId, relatedEntity.id),
        // ),
      ),
    )
    .where(eq(entity.id, id))
    .groupBy(entity.id, relationshipArc.id, relationship.id, relatedEntity.id)
    .orderBy(desc(count(relationshipReview)))
    .limit(100);

  if (!entities.length) return {};

  const selectedEntity = entities[0].entity;
  const relatedEntities: RelatedEntityRead[] = entities.map((row) => {
    return {
      ...row.relatedEntity,
      relationshipSignificance: row.relationshipSignificance,
      reviewCount: row.reviewCount,
    };
  });
  const complexEntity: EntityComplexRead = {
    ...selectedEntity,
    relatedEntities,
  };

  // Create a cache of loaded entities
  const groupedEntitiesComplex = new Map<string, EntityComplexRead>();
  groupedEntitiesComplex.set(complexEntity.id, complexEntity);
  const loadedEntityIds = [complexEntity.id];

  const nextEntityIds = complexEntity.relatedEntities.map(
    (relatedEntity) => relatedEntity.id,
  );
  let recurseCount = depth - 1;

  while (recurseCount) {
    // Get the entities that we haven't loaded yet
    const ids = nextEntityIds.filter(
      (entityId) => !loadedEntityIds.includes(entityId),
    );

    // Get the next result of entities
    const mappedEntities = await entityComplexByIds({
      ids,
    });

    // Reset the new Array of next ids
    nextEntityIds.length = 0;

    // Add these to the grouped entities
    for (const [key, value] of Object.entries(mappedEntities)) {
      groupedEntitiesComplex.set(key, value);
      loadedEntityIds.push(key);
      nextEntityIds.push(
        ...value.relatedEntities.map((relatedEntity) => relatedEntity.id),
      );
    }

    // Deduplicate both loaded ids and next entity ids
    const loadedEntityIdsSet = new Set(loadedEntityIds);
    const nextEntityIdsSet = new Set(nextEntityIds);

    loadedEntityIds.length = 0;
    nextEntityIds.length = 0;

    loadedEntityIds.push(...Array.from(loadedEntityIdsSet));
    nextEntityIds.push(...Array.from(nextEntityIdsSet));

    // Decrement the recurse count
    recurseCount--;
  }

  return Object.fromEntries(groupedEntitiesComplex.entries());
};

export const entityComplexByIds = async ({ ids }: { ids: string[] }) => {
  const entities = await db
    .select({
      entity,
      relatedEntity,
      relationshipSignificance: sql<number>`COALESCE(avg(relationship_review.significance), 0) as avg_significance`,
      reviewCount: sql<number>`count(relationship_review.significance) as review_count`,
    })
    .from(entity)
    .innerJoin(
      relationshipArc,
      or(
        eq(entity.id, relationshipArc.startEntityId),
        // eq(entity.id, relationshipArc.endEntityId),
      ),
    )
    .innerJoin(
      relationship,
      eq(relationshipArc.relationshipId, relationship.id),
    )
    .leftJoin(
      relationshipReview,
      eq(relationship.id, relationshipReview.relationshipId),
    )
    .innerJoin(
      relatedEntity,
      or(
        and(
          eq(relationshipArc.startEntityId, entity.id),
          eq(relationshipArc.endEntityId, relatedEntity.id),
        ),
        // and(
        //   eq(relationshipArc.endEntityId, entity.id),
        //   eq(relationshipArc.startEntityId, relatedEntity.id),
        // ),
      ),
    )
    .where(inArray(entity.id, ids))
    .groupBy(entity.id, relationshipArc.id, relationship.id, relatedEntity.id)
    .orderBy(desc(count(relationshipReview)))
    .limit(100);

  // Create a map to store grouped entities
  const groupedEntities = new Map<string, typeof entities>();

  // Function to add an entity to the group based on entity ID
  entities.forEach((row) => {
    const entityId = row.entity.id;

    if (groupedEntities.has(entityId)) {
      groupedEntities.get(entityId)?.push(row);
    } else {
      groupedEntities.set(entityId, [row]);
    }
  });

  // Convert the map to an array of arrays
  const groupedEntitiesArray = [...groupedEntities.values()];

  const groupedEntitiesComplex = new Map<string, EntityComplexRead>();
  for (const groupedEntities of groupedEntitiesArray) {
    const selectedEntity = groupedEntities[0].entity;
    const relatedEntities: RelatedEntityRead[] = groupedEntities.map((row) => {
      return {
        ...row.relatedEntity,
        relationshipSignificance: row.relationshipSignificance,
        reviewCount: row.reviewCount,
      };
    });
    const complexEntity = {
      ...selectedEntity,
      relatedEntities,
    };
    groupedEntitiesComplex.set(selectedEntity.id, complexEntity);
  }

  return Object.fromEntries(groupedEntitiesComplex.entries());
};
