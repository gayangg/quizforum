// import { Session } from "../deps.js";

// const session = new Session();

// // Initialize the session


// export const sessionMiddleware = session.use()(session);

// export default session;

import { Session } from "https://deno.land/x/oak_sessions/mod.ts";

const sessionMiddleware = new Session({
  framework: "oak",
  store: "memory", // You can use "file" or a custom store for persistence
  cookieSetOptions: { httpOnly: true, secure: false }, // Customize as needed
});

const sessionInitMiddleware = async (ctx, next) => {
  // Initialize session for every request
  await sessionMiddleware.init(ctx);
  await next();
};
export { sessionMiddleware, sessionInitMiddleware }