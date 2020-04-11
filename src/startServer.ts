import "reflect-metadata";
import "dotenv/config";
import { createTypeOrmConn } from "./utils/createTypeOrmConn";
import { GraphQLServer } from "graphql-yoga";
import { redis } from "./redis";
import { confirmEmail } from "./routes/confirmEmail";
import { genSchema } from "./utils/genSchema";
import * as session from "express-session";
import * as connectRedis from "connect-redis";

export const startServer = async () => {
  const server = new GraphQLServer({
    schema: genSchema(),
    context: ({ request }) => ({
      redis,
      hostUrl: request.protocol + "://" + request.get("host"),
      session: request.session,
    }),
  });

  const RedisStore = connectRedis(session);

  server.express.use(
    session({
      store: new RedisStore({ client: redis }),
      name: "qid",
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    })
  );

  const cors = {
    credentials: true,
    origin: process.env.FRONTEND_HOST as string,
  };

  server.express.get("/confirm/:id", confirmEmail);

  await createTypeOrmConn();

  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000,
    cors,
  });
  console.log("Server is running on localhost:4000");

  return app;
};
