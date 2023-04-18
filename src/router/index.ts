import Router from "koa-router"
import koaBody from "koa-body"
import { koaBodyConfig } from "../util/file"
import { errorHandler } from "../util/error"
import { tick, tack } from "../util/tick-tack"
import { roleFilter } from "../util/auth"
import UserRouter from "./user"

const UserRouterGroup = new Router()
  .use(roleFilter())
  .get("/users", UserRouter.getUsers)

const router = new Router()
  .use(errorHandler)
  .use(koaBody(koaBodyConfig))
  .use(tick, tack)
  .use(UserRouterGroup.routes())

export default router
