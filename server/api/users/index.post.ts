import { userCreate } from "~/db/services/user/userCreate";
import type { NewUser, User } from "~/db/services/user/userCreate";

export default defineEventHandler<{ body: NewUser }, Promise<User>>(
  async (event) => {
    const body = await readBody<NewUser>(event);
    const newUser = await userCreate(body);
    
    if (!newUser) throw Error("Error creating the user")
    
    return newUser
  }
);
