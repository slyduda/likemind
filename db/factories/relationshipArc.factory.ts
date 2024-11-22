import { faker } from "@faker-js/faker";
import { relationshipArcInsert } from "@/services";
import { useEntityFactory, useRelationshipFactory } from ".";
import type { RelationshipArcInsert, RelationshipArcSelect } from "@/db/models";
import type { Modify } from "@/@types";

type OptionalRelationshipArcInsert = {
  id?: string;
  relationshipId?: string;
  type?: string;
  startEntityId?: string;
  endEntityId?: string;
  createdAt?: Date;
  isFake?: boolean;
};

export interface RelationshipArcFactoryCreate
  extends Modify<
    RelationshipArcSelect,
    {
      createdAt?: Date;
    }
  > {}

export const useRelationshipArcFactory = () => {
  const relationshipFactory = useRelationshipFactory();
  const entityFactory = useEntityFactory();

  const create = (
    insert?: OptionalRelationshipArcInsert,
  ): RelationshipArcFactoryCreate => {
    return {
      id: faker.string.uuid(),
      type: faker.person.jobType(),
      isFake: true,
      ...insert,
      relationshipId: insert?.relationshipId
        ? insert.relationshipId
        : relationshipFactory.create().id,
      startEntityId: insert?.startEntityId
        ? insert.startEntityId
        : entityFactory.create().id,
      endEntityId: insert?.endEntityId
        ? insert.endEntityId
        : entityFactory.create().id,
    };
  };

  const insert = async (
    insert: RelationshipArcInsert,
  ): Promise<RelationshipArcSelect> => {
    return await relationshipArcInsert(insert);
  };

  return { create, insert };
};
