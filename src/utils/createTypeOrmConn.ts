import { getConnectionOptions, createConnection } from "typeorm";

export const createTypeOrmConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return await createConnection({ ...connectionOptions, name: "default" });
};
