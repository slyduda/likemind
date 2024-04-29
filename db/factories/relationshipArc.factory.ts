import { faker } from "@faker-js/faker";
import { relationshipArcInsert } from "../services";
import { useRelationshipFactory } from "./relationship.factory";
import { useEntityFactory } from ".";
import type { RelationshipArcInsert, RelationshipArcSelect } from "../models";

type OptionalRelationshipArcInsert = {
  id?: string;
  relationshipId?: string;
  type?: string;
  startEntityId?: string;
  endEntityId?: string;
  createdAt?: Date;
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
