import { faker } from "@faker-js/faker";
import { involvementReviewInsert } from "@/services";
import { useUserFactory, useInvolvementFactory } from ".";
import type {
  InvolvementReviewInsert,
  InvolvementReviewSelect,
} from "@/db/models";
import type { Modify } from "@/@types";

type OptionalInvolvementReviewInsert = {
  id?: string;
  sentiment?: number;
  impact?: number;
  involvementId?: string;
  userId?: string;
  createdAt?: Date;
  isFake?: boolean;
};

export interface InvolvementReviewFactoryCreate
  extends Modify<
    InvolvementReviewSelect,
    {
      createdAt?: Date;
    }
  > {}

export const useInvolvementReviewFactory = () => {
  const involvementFactory = useInvolvementFactory();
  const userFactory = useUserFactory();

  const create = async (
    insert?: OptionalInvolvementReviewInsert,
  ): Promise<InvolvementReviewFactoryCreate> => {
    return {
      id: faker.string.uuid(),
      sentiment: faker.number.int({ min: -100, max: 100 }),
      impact: faker.number.int({ min: 0, max: 100 }),
      isFake: true,
      ...insert,
      involvementId: insert?.involvementId
        ? insert.involvementId
        : involvementFactory.create().id,
      userId: insert?.userId ? insert.userId : (await userFactory.create()).id,
    };
  };

  const insert = async (
    insert: InvolvementReviewInsert,
  ): Promise<InvolvementReviewSelect> => {
    return await involvementReviewInsert(insert);
  };

  return { create, insert };
};
