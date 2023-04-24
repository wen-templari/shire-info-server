import "reflect-metadata"
import { DataSource } from "typeorm"
import config from "../config.json"
import { User } from "./model/user"
import { Group } from "./model/group"
import { GroupUser } from "./model/group-user"

const AppDataSource = new DataSource({
  type: "mysql",
  host: config.DBConfig.host,
  username: config.DBConfig.username,
  password: config.DBConfig.password,
  database: config.DBConfig.database,
  synchronize: true,
  logging: process.env.NODE_ENV==="development"?false:false,
  entities: [
    User,Group
  ],
  migrations: [],
  subscribers: [],
})

export default AppDataSource
