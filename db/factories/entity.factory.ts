import { faker } from "@faker-js/faker";
import { entityInsert } from "../services";

type OptionalEntityInsert = {
  id?: string;
  name?: string;
  createdAt?: Date;
};

export const useEntityFactory = () => {
  const create = async (insert?: OptionalEntityInsert) => {
    return entityInsert({
      id: faker.string.uuid(),
      name: faker.company.name(),
      ...insert,
    });
  };

  return { create };
};
