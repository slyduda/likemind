import { faker } from "@faker-js/faker";
import { activityInsert } from "../services";
import { probability } from "@/utils";

type OptionalActivityInsert = {
  id?: string;
  description?: string;
  startedAt?: Date;
  endedAt?: Date | null;
  createdAt?: Date;
};

export const useActivityFactory = () => {
  const create = async (insert?: OptionalActivityInsert) => {
    const startedAt = faker.date.past({
      years: faker.number.int({ min: 1, max: 10 }),
    });
    const isEvent = probability(0.2); // if the activity does not have duration
    const endedAt = probability(0.4)
      ? null
      : faker.date.between({ from: startedAt, to: new Date() });

    return activityInsert({
      id: faker.string.uuid(),
      description: faker.lorem.paragraph({ max: 5, min: 2 }),
      startedAt,
      endedAt: isEvent ? startedAt : endedAt,
      ...insert,
    });
  };

  return { create };
};
