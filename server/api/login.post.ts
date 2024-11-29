import { InferOutput, object, optional, parse, string } from "valibot";
import { userByEmail } from "~/services";
import { userEmailSchema, userPasswordSchema } from "~/schemas/user.schema";
import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";

// Endpoint Body Schema
const loginSchema = object({
  email: userEmailSchema,
  password: userPasswordSchema,
  redirect: optional(string()),
});
type LoginSchema = InferOutput<typeof loginSchema>;

export default defineEventHandler<{ body: LoginSchema }, Promise<void>>(
  async (event) => {
    const runtimeConfig = useRuntimeConfig();
    const body = await readBody(event);

    // Parse and transform the body
    const login = parse(loginSchema, body);

    // Check to see if the user exists
    const user = await userByEmail({ email: login.email });
    if (!user)
      throw createError({
        statusCode: 401,
        statusMessage: "Email or password are incorrect",
      });

    // Check to see if the passwords match
    const isMatch = compareSync(login.password, user.password);
    if (!isMatch)
      throw createError({
        statusCode: 401,
        statusMessage: "Email or password are incorrect",
      });

    // Create a JWT token
    const accessToken = jwt.sign({}, runtimeConfig.jwtSecret, {
      expiresIn: 60 * 60,
      subject: user.id,
    });
    setCookie(event, "access_token", accessToken, { httpOnly: true });

    if (body.redirect) {
      return await sendRedirect(event, body.redirect, 302);
    }

    return;
  },
);
