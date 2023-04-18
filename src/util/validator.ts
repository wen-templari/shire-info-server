import { Next, ParameterizedContext as Ctx } from "koa"
import { assert, Describe } from "superstruct"
import { StatusCode, ServiceError } from "./error"

const validator = function <T> (struct: Describe<T>) {
  return async (ctx: Ctx, next: Next) => {
    try {
      assert(ctx.request.body, struct)
      await next()
    } catch (error: any) {
      throw new ServiceError(error).setStatusCode(
        StatusCode.Unprocessable_Entity,
      )
    }
  }
}

export default validator
