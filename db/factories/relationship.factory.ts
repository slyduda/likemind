import { faker } from "@faker-js/faker";
import { relationshipInsert } from "../services";
import type { RelationshipInsert, RelationshipSelect } from "../models";

type OptionalRelationshipInsert = {
  id?: string;
  createdAt?: Date;
};

export interface RelationshipFactoryCreate
  extends Modify<
    RelationshipSelect,
    {
      createdAt?: Date;
    }
  > {}

export const useRelationshipFactory = () => {
  const create = (
    insert?: OptionalRelationshipInsert,
  ): RelationshipFactoryCreate => {
    return {
      id: faker.string.uuid(),
      ...insert,
    };
  };

  const insert = async (
    insert: RelationshipInsert,
  ): Promise<RelationshipSelect> => {
    return await relationshipInsert(insert);
  };

  return { create, insert };
};
