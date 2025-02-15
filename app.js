import { Application, Session } from "./deps.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { sessionMiddleware } from "./middlewares/sessionMiddleware.js";
import { userSessionMiddleware } from "./middlewares/userSessionMiddleware.js";
//import { oakStatic } from "./middlewares/staticMiddleware.js";
//import { userMiddleware } from "/middlewares/userMiddleware.js";
import { router } from "./routes/routes.js";

const app = new Application();
app.use(Session.initMiddleware());


app.use(errorMiddleware);
app.use(authMiddleware);
app.use(userSessionMiddleware);
//app.use(userMiddleware);
//app.use(sessionMiddleware);
app.use(renderMiddleware);
//app.use(oakStatic("static"));
app.use(router.routes());

export { app }