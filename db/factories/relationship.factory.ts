import { faker } from "@faker-js/faker";
import { relationshipInsert } from "@/services";
import type { RelationshipInsert, RelationshipSelect } from "@/db/models";
import type { Modify } from "@/@types";

type OptionalRelationshipInsert = {
  id?: string;
  createdAt?: Date;
  isFake?: boolean;
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
      isFake: true,
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
