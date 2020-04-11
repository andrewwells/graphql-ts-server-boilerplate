import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import { createMiddleware } from "../../utils/createMiddleware";
import middleware from "./middleware";

export const resolvers: ResolverMap = {
  Query: {
    me: createMiddleware(middleware, async (_, __, { session }) => {
      const user = await User.findOne({ id: session.userId });
      if (!user) {
        return [{ path: "me", message: "no user found" }];
      }

      return user;
    }),
  },
};
