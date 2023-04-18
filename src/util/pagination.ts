import { Context } from "koa"

const getPagingParams = (ctx: Context) => {
  const offset = ctx.query.offset && !(ctx.query.offset instanceof Array) ? parseInt(ctx.query.offset) : 0
  const limit = ctx.query.limit && !(ctx.query.limit instanceof Array) ? parseInt(ctx.query.limit) : 30
  return { offset, limit }
}

export {
  getPagingParams,
}
