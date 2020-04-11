import { ResolverMap } from "../../types/graphql-utils";
import * as bcrypt from "bcryptjs";
import { User } from "../../entity/User";

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (
      _,
      { email, password }: GQL.ILoginOnMutationArguments,
      { session }
    ) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return [{ path: "login", message: "invalid credentials" }];
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return [{ path: "login", message: "invalid credentials" }];
      }

      if (!user.confirmed) {
        return [{ path: "login", message: "please confirm your email" }];
      }

      session.userId = user.id;

      return null;
    },
  },
};
