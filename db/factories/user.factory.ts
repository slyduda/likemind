import { faker } from "@faker-js/faker";
import { userInsert } from "../services";
import { parse } from "valibot";
import { userPasswordTransformer } from "~/schemas/user.schema";

type OptionalUserInsert = {
  id?: string;
  email?: string;
  handle?: string;
  password?: string;
  isRegistered?: boolean;
  createdAt?: Date;
};

export const useUserFactory = () => {
  const create = async (insert?: OptionalUserInsert) => {
    return userInsert({
      id: faker.string.uuid(),
      handle: faker.internet.displayName(),
      email: faker.internet.email(),
      isRegistered: false,
      ...insert,
      password: parse(
        userPasswordTransformer,
        insert?.password ? insert.password : "possword",
      ),
    });
  };

  return { create };
};
