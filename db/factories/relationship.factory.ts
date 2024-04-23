import { faker } from "@faker-js/faker";
import { relationshipInsert } from "../services";

type OptionalRelationshipInsert = {
  id?: string;
  createdAt?: Date;
};

export const useRelationshipFactory = () => {
  const create = async (insert?: OptionalRelationshipInsert) => {
    return relationshipInsert({
      id: faker.string.uuid(),
      ...insert,
    });
  };

  return { create };
};
