import { UserInsert, UserSelect } from "~/db/models";
import { userCreate } from "~/db/services/user/userCreate";

export default defineEventHandler<{ body: UserInsert }, Promise<UserSelect>>(
  async (event) => {
    const body = await readBody<UserInsert>(event);
    const newUser = await userCreate(body);
    
    if (!newUser) throw Error("Error creating the user")
    
    return newUser
  }
);
