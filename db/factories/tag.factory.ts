import { faker } from "@faker-js/faker";
import { tagInsert } from "../services";

type OptionalTagInsert = {
  id?: string;
  name?: string;
  createdAt?: Date;
};

export const useTagFactory = () => {
  const create = async (insert?: OptionalTagInsert) => {
    return tagInsert({
      id: faker.string.uuid(),
      name: faker.lorem.word(),
      ...insert,
    });
  };

  return { create };
};
