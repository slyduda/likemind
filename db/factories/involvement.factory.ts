import { faker } from "@faker-js/faker";
import { involvementInsert } from "../services";
import { useEntityFactory } from "./entity.factory";
import { useActivityFactory } from "./activity.factory";

type OptionalInvolvementInsert = {
  id?: string;
  description?: string;
  source?: string;
  entityId?: string;
  activityId?: string;
  createdAt?: Date;
};

export const useInvolvementFactory = () => {
  const activityFactory = useActivityFactory();
  const entityFactory = useEntityFactory();

  const create = async (insert?: OptionalInvolvementInsert) => {
    return involvementInsert({
      id: faker.string.uuid(),
      description: faker.lorem.paragraph({ min: 1, max: 3 }),
      source: "",
      ...insert,
      activityId: insert?.activityId
        ? insert.activityId
        : (await activityFactory.create()).id,
      entityId: insert?.entityId
        ? insert.entityId
        : (await entityFactory.create()).id,
    });
  };

  return { create };
};
