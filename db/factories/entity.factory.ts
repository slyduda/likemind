import { faker } from "@faker-js/faker";
import type { EntityInsert, EntitySelect } from "../models";
import { entityInsert, entityInsertMany } from "../services";

type OptionalEntityInsert = {
  id?: string;
  name?: string;
  createdAt?: Date;
  isFake?: boolean;
};

export interface EntityFactoryCreate
  extends Modify<
    EntitySelect,
    {
      createdAt?: Date;
    }
  > {}

export const useEntityFactory = () => {
  const create = (insert?: OptionalEntityInsert): EntityFactoryCreate => {
    return {
      id: faker.string.uuid(),
      name: faker.company.name(),
      isFake: true,
      ...insert,
    };
  };

  const insert = async (insert: EntityInsert): Promise<EntitySelect> => {
    return await entityInsert(insert);
  };

  const insertMany = async (
    insert: EntityInsert[],
  ): Promise<EntitySelect[]> => {
    return await entityInsertMany(insert);
  };

  return { create, insert, insertMany };
};
