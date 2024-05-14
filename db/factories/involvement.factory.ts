import { faker } from "@faker-js/faker";
import { involvementInsert } from "../services";
import { useEntityFactory } from "./entity.factory";
import { useActivityFactory } from "./activity.factory";
import type { InvolvementInsert, InvolvementSelect } from "../models";

type OptionalInvolvementInsert = {
  id?: string;
  description?: string;
  entityId?: string;
  activityId?: string;
  createdAt?: Date;
  isFake?: boolean;
};

export interface InvolvementFactoryCreate
  extends Modify<
    InvolvementSelect,
    {
      createdAt?: Date;
    }
  > {}

export const useInvolvementFactory = () => {
  const activityFactory = useActivityFactory();
  const entityFactory = useEntityFactory();

  const create = (
    insert?: OptionalInvolvementInsert,
  ): InvolvementFactoryCreate => {
    return {
      id: faker.string.uuid(),
      description: faker.lorem.paragraph({ min: 1, max: 3 }),
      isFake: true,
      ...insert,
      activityId: insert?.activityId
        ? insert.activityId
        : activityFactory.create().id,
      entityId: insert?.entityId ? insert.entityId : entityFactory.create().id,
    };
  };

  const insert = async (
    insert: InvolvementInsert,
  ): Promise<InvolvementSelect> => {
    return await involvementInsert(insert);
  };

  return { create, insert };
};
