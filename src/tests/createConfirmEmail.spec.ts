// import { createConfirmEmailLink } from "../utils/createConfirmEmailLink";
// import { createTypeOrmConn } from "../utils/createTypeOrmConn";
// import fetch from "node-fetch";
// import { User } from "../entity/User";
// import * as Redis from "ioredis";

// let userId = "";

// beforeAll(async () => {
//   await createTypeOrmConn();
//   const user = await User.create({
//     email: "test@email.com",
//     password: "password",
//   }).save();
//   userId = user.id;
// });

// describe("Confirm Email Link", () => {
//   it("should generate a link", async () => {
//     const url = process.env.TEST_HOST as string;
//     const confirmLink = await createConfirmEmailLink(url, userId, new Redis());
//     const response = await fetch(url);
//     const text = await response.text();
//     console.log(text, confirmLink);
//   });
// });
