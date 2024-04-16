import jwt from "jsonwebtoken";

export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const accessToken = getCookie(event, "access_token");

  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, runtimeConfig.jwtSecret);
      event.context.user = decoded.sub;
    } catch (err) {
      // err
    }
  }
});
