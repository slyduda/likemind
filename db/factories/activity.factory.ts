import { faker } from "@faker-js/faker";
import { activityInsert } from "@/services";
import { probability } from "@/utils";
import type { ActivityInsert, ActivitySelect } from "@/db/models";
import type { Modify } from "@/@types";

type OptionalActivityInsert = {
  id?: string;
  description?: string;
  startedAt?: Date;
  endedAt?: Date | null;
  createdAt?: Date;
  isFake?: boolean;
};

export interface ActivityFactoryCreate
  extends Modify<
    ActivitySelect,
    {
      createdAt?: Date;
    }
  > {}

export const useActivityFactory = () => {
  const create = (insert?: OptionalActivityInsert): ActivityFactoryCreate => {
    const startedAt = faker.date.past({
      years: faker.number.int({ min: 1, max: 10 }),
    });
    const isEvent = probability(0.2); // if the activity does not have duration
    const endedAt = probability(0.4)
      ? null
      : faker.date.between({ from: startedAt, to: new Date() });

    return {
      id: faker.string.uuid(),
      description: faker.lorem.paragraphs({ max: 8, min: 1 }, "\n\n"),
      startedAt,
      endedAt: isEvent ? startedAt : endedAt,
      isFake: true,
      ...insert,
    };
  };

  const insert = async (insert: ActivityInsert): Promise<ActivitySelect> => {
    return await activityInsert(insert);
  };

  return { create, insert };
};
