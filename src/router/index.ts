import Router from "koa-router"
import koaBody from "koa-body"
import { koaBodyConfig } from "../util/file"
import { errorHandler } from "../util/error"
import { tick, tack } from "../util/tick-tack"
import UserRouter from "./user"
import GroupRouter from "./group"

const UserRouterGroup = new Router()
  .get("/users", UserRouter.getUsers)
  .get("/users/:userId", UserRouter.getByUserId)
  .post("/users/:userId/token", UserRouter.createToken)
  .post("/users", UserRouter.create)
  .put("/users/:userId", UserRouter.update)

const GroupRouterGroup = new Router()
  .post("/groups", GroupRouter.create)
  .put("/groups/:groupId/users/:userId", GroupRouter.updateGroupUser)
  .delete("/groups/:groupId/users/:userId", GroupRouter.deleteGroupUser)
  .get("/groups/:groupId", GroupRouter.getGroupById)

const router = new Router()
  .use(errorHandler)
  .use(koaBody(koaBodyConfig))
  .use(tick, tack)
  .use(UserRouterGroup.routes())
  .use(GroupRouterGroup.routes())

export default router
