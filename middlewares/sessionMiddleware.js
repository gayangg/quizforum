import { Session } from "../deps.js";
//import { Session } from "https://deno.land/x/oak_sessions/mod.ts";
const session = new Session();

// Initialize the session


//export const sessionMiddleware = session.use()(session);
//export const sessionMiddleware = session.initMiddleware();
export { session }