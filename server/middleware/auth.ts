import jwt from "jsonwebtoken";
import { parse, string } from "valibot";

type EventContextUser = string;

declare module "h3" {
  interface H3EventContext {
    user?: EventContextUser;
  }
}

export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const accessToken = getCookie(event, "access_token");

  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, runtimeConfig.jwtSecret);
      const sub = parse(string(), decoded.sub);
      event.context.user = sub;
    } catch (err) {
      // err
    }
  }
});
