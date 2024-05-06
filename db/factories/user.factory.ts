import { faker } from "@faker-js/faker";
import { userInsert } from "../services";
import { parseAsync } from "valibot";
import { userPasswordTransformer } from "~/schemas/user.schema";
import type { UserInsert, UserSelect } from "../models";

type OptionalUserInsert = {
  id?: string;
  email?: string;
  handle?: string;
  password?: string;
  isRegistered?: boolean;
  isAdmin?: boolean;
  isLocked?: boolean;
  isFake?: boolean;
  createdAt?: Date;
};

export interface UserFactoryCreate
  extends Modify<
    UserSelect,
    {
      createdAt?: Date;
      isAdmin?: boolean;
      isLocked?: boolean;
      isRegistered?: boolean;
    }
  > {}

export const useUserFactory = () => {
  const create = async (
    insert?: OptionalUserInsert,
  ): Promise<UserFactoryCreate> => {
    return {
      id: faker.string.uuid(),
      handle: faker.internet.displayName(),
      email: faker.internet.email(),
      isFake: true,
      ...insert,
      password: await parseAsync(
        userPasswordTransformer,
        insert?.password ? insert.password : "possword",
      ),
    };
  };

  const insert = async (insert: UserInsert): Promise<UserSelect> => {
    return await userInsert(insert);
  };

  return { create, insert };
};
