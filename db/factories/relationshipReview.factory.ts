import { faker } from "@faker-js/faker";
import { relationshipReviewInsert } from "../services";
import { useRelationshipFactory } from "./relationship.factory";
import { useUserFactory } from ".";

type OptionalRelationshipReviewInsert = {
  id?: string;
  significance?: number;
  relationshipId?: string;
  userId?: string;
  createdAt?: Date;
};

export const useRelationshipReviewFactory = () => {
  const relationshipFactory = useRelationshipFactory();
  const userFactory = useUserFactory();

  const create = async (insert?: OptionalRelationshipReviewInsert) => {
    return relationshipReviewInsert({
      id: faker.string.uuid(),
      significance: faker.number.int({ min: 0, max: 100 }),
      ...insert,
      relationshipId: insert?.relationshipId
        ? insert.relationshipId
        : (await relationshipFactory.create()).id,
      userId: insert?.userId ? insert.userId : (await userFactory.create()).id,
    });
  };

  return { create };
};
