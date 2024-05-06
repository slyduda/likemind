import { faker } from "@faker-js/faker";
import { tagInsert } from "../services";
import type { TagInsert, TagSelect } from "../models";

type OptionalTagInsert = {
  id?: string;
  name?: string;
  createdAt?: Date;
  isFake?: boolean;
};

export interface TagFactoryCreate
  extends Modify<
    TagSelect,
    {
      createdAt?: Date;
    }
  > {}

export const useTagFactory = () => {
  const create = (insert?: OptionalTagInsert): TagFactoryCreate => {
    return {
      id: faker.string.uuid(),
      name: faker.lorem.word(),
      isFake: true,
      ...insert,
    };
  };

  const insert = async (insert: TagInsert) => {
    return await tagInsert(insert);
  };

  return { create, insert };
};
