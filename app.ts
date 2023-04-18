import Koa from "koa"
import AppDataSource from "./src/datatsource"
import router from "./src/router"
import { initFolder } from "./src/util/file"
import logger from "./src/util/logger"

AppDataSource.initialize().catch((err) => {
  logger.error(err)
})

initFolder()

const app = new Koa()
app.use(router.routes())

const Port = 3011

app.listen(Port)

logger.info("listening at:", Port)
