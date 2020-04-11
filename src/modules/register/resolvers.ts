import * as bcrypt from "bcryptjs";
import * as yup from "yup";
import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import { formatYupError } from "../../utils/formatYupError";
import { createConfirmEmailLink } from "../../utils/createConfirmEmailLink";

const schema = yup.object().shape({
  email: yup.string().min(3).max(255).email(),
  password: yup.string().min(3).max(255),
});

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (
      _,
      args: GQL.IRegisterOnMutationArguments,
      { redis, hostUrl }
    ) => {
      try {
        await schema.validate(args, { abortEarly: false });
      } catch (err) {
        // console.log(err);
        return formatYupError(err);
      }

      const { email, password } = args;

      const userAlreadyExists = User.findOne({
        where: { email },
        select: ["id"],
      });

      if (userAlreadyExists) {
        return [{ path: "email", message: "already taken" }];
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = User.create({
        email,
        password: hashedPassword,
      });
      await user.save();

      const confirmLink = await createConfirmEmailLink(hostUrl, user.id, redis);
      console.log(confirmLink);

      return null;
    },
  },
};
