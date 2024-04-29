import { faker } from "@faker-js/faker";
import { relationshipReviewInsert } from "../services";
import { useRelationshipFactory } from "./relationship.factory";
import { useUserFactory } from ".";
import type {
  RelationshipReviewInsert,
  RelationshipReviewSelect,
} from "../models";

type OptionalRelationshipReviewInsert = {
  id?: string;
  significance?: number;
  relationshipId?: string;
  userId?: string;
  createdAt?: Date;
};

export interface RelationshipReviewFactoryCreate
  extends Modify<
    RelationshipReviewSelect,
    {
      createdAt?: Date;
    }
  > {}

export const useRelationshipReviewFactory = () => {
  const relationshipFactory = useRelationshipFactory();
  const userFactory = useUserFactory();

  const create = async (
    insert?: OptionalRelationshipReviewInsert,
  ): Promise<RelationshipReviewFactoryCreate> => {
    return {
      id: faker.string.uuid(),
      significance: faker.number.int({ min: 0, max: 100 }),
      ...insert,
      relationshipId: insert?.relationshipId
        ? insert.relationshipId
        : relationshipFactory.create().id,
      userId: insert?.userId ? insert.userId : (await userFactory.create()).id,
    };
  };

  const insert = async (
    insert: RelationshipReviewInsert,
  ): Promise<RelationshipReviewSelect> => {
    return await relationshipReviewInsert(insert);
  };

  return { create, insert };
};
