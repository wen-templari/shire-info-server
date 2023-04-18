import Router from "koa-router"
import logger from "./logger"
import { ParameterizedContext } from "koa"

export const tick: Router.IMiddleware = async (ctx:ParameterizedContext, next:any) => {
  await next()
  const rt = ctx.response.get("X-Response-Time")
  logger.log(`${ctx.method} ${ctx.url} - ${rt}`)
}

export const tack: Router.IMiddleware = async (ctx:any, next:any) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set("X-Response-Time", `${ms}ms`)
}
