import { faker } from "@faker-js/faker";
import { relationshipArcInsert } from "../services";
import { useRelationshipFactory } from "./relationship.factory";
import { useEntityFactory } from ".";

type OptionalRelationshipArcInsert = {
  id?: string;
  relationshipId?: string;
  type?: string;
  startEntityId?: string;
  endEntityId?: string;
  createdAt?: Date;
};

export const useRelationshipArcFactory = () => {
  const relationshipFactory = useRelationshipFactory();
  const entityFactory = useEntityFactory();

  const create = async (insert?: OptionalRelationshipArcInsert) => {
    return relationshipArcInsert({
      id: faker.string.uuid(),
      type: faker.person.jobType(),
      ...insert,
      relationshipId: insert?.relationshipId
        ? insert.relationshipId
        : (await relationshipFactory.create()).id,
      startEntityId: insert?.startEntityId
        ? insert.startEntityId
        : (await entityFactory.create()).id,
      endEntityId: insert?.endEntityId
        ? insert.endEntityId
        : (await entityFactory.create()).id,
    });
  };

  return { create };
};
