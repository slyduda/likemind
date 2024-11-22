import { faker } from "@faker-js/faker";
import { activityReviewInsert } from "@/services";
import { useUserFactory, useActivityFactory } from ".";
import type { ActivityReviewInsert, ActivityReviewSelect } from "@/db/models";
import type { Modify } from "@/@types";

type OptionalActivityReviewInsert = {
  id?: string;
  importance?: number;
  activityId?: string;
  userId?: string;
  createdAt?: Date;
  isFake?: boolean;
};

export interface ActivityReviewFactoryCreate
  extends Modify<
    ActivityReviewSelect,
    {
      createdAt?: Date;
    }
  > {}

export const useActivityReviewFactory = () => {
  const activityFactory = useActivityFactory();
  const userFactory = useUserFactory();

  const create = async (
    insert?: OptionalActivityReviewInsert,
  ): Promise<ActivityReviewFactoryCreate> => {
    return {
      id: faker.string.uuid(),
      importance: faker.number.int({ min: 0, max: 100 }),
      isFake: true,
      ...insert,
      activityId: insert?.activityId
        ? insert.activityId
        : activityFactory.create().id,
      userId: insert?.userId ? insert.userId : (await userFactory.create()).id,
    };
  };

  const insert = async (
    insert: ActivityReviewInsert,
  ): Promise<ActivityReviewSelect> => {
    return await activityReviewInsert(insert);
  };

  return { create, insert };
};
