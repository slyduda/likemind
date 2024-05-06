import { faker } from "@faker-js/faker";
import { activityTagInsert } from "../services";
import { useActivityFactory, useTagFactory } from ".";
import type { ActivityTagInsert, ActivityTagSelect } from "../models";

type OptionalActivityTagInsert = {
  id?: string;
  tagName?: string;
  activityId?: string;
  createdAt?: Date;
  isFake?: boolean;
};

export interface ActivityTagFactoryCreate
  extends Modify<
    ActivityTagSelect,
    {
      createdAt?: Date;
    }
  > {}

export const useActivityTagFactory = () => {
  const activityFactory = useActivityFactory();
  const tagFactory = useTagFactory();

  const create = (
    insert?: OptionalActivityTagInsert,
  ): ActivityTagFactoryCreate => {
    return {
      id: faker.string.uuid(),
      isFake: true,
      ...insert,
      activityId: insert?.activityId
        ? insert.activityId
        : activityFactory.create().id,
      tagName: insert?.tagName ? insert.tagName : tagFactory.create().name,
    };
  };

  const insert = async (
    insert: ActivityTagInsert,
  ): Promise<ActivityTagSelect> => {
    return await activityTagInsert(insert);
  };

  return { create, insert };
};
