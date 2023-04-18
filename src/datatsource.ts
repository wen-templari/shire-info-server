import "reflect-metadata"
import { DataSource } from "typeorm"
import config from "../config.json"

const AppDataSource = new DataSource({
  type: "mssql",
  host: config.DBConfig.host,
  username: config.DBConfig.username,
  password: config.DBConfig.password,
  database: config.DBConfig.database,
  synchronize: false,
  logging: process.env.NODE_ENV==="development"?false:false,
  entities: [
    // Add your entities here
  ],
  migrations: [],
  subscribers: [],
  extra: {
    trustServerCertificate: true,
  },
})

export default AppDataSource
