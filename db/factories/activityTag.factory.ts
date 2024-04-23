import { faker } from "@faker-js/faker";
import { activityTagInsert } from "../services";
import { useActivityFactory, useTagFactory } from ".";

type OptionalActivityTagInsert = {
  id?: string;
  tagName?: string;
  activityId?: string;
  createdAt?: Date;
};

export const useActivityTagFactory = () => {
  const activityFactory = useActivityFactory();
  const tagFactory = useTagFactory();

  const create = async (insert?: OptionalActivityTagInsert) => {
    return activityTagInsert({
      id: faker.string.uuid(),
      ...insert,
      activityId: insert?.activityId
        ? insert.activityId
        : (await activityFactory.create()).id,
      tagName: insert?.tagName
        ? insert.tagName
        : (await tagFactory.create()).name,
    });
  };

  return { create };
};
