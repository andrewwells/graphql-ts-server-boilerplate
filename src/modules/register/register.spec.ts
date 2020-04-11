import { createTypeOrmConn } from "../../utils/createTypeOrmConn";

beforeAll(async () => {
  await createTypeOrmConn();
});
// import { startServer } from "../../startServer";
// import { request } from "http";
// let getHost = () => "";
// beforeAll(async () => {
//   const app = await startServer();
//   const { port } = app.address();
//   getHost = () => `http://127.0.0.1/${port}`;
// });

// const email = "test@test.com";
// const password = "123123";

// const mutation = `
// mutation {
//     register(email: "${email}", password: "${password}") {
//         path
//         message
//     }
// }
// `;

// test("Register User", async () => {
//     const response = await request(getHost(), mutation)

// });
