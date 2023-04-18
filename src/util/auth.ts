import { ParameterizedContext, Next } from "koa"
import { ServiceError, StatusCode } from "./error"
import logger from "./logger"
import crypto from "crypto"
import jwt from "jsonwebtoken"

const key = crypto.randomBytes(256).toString("base64")
export const genToken = (payload: string | object | Buffer) => {
  const token = jwt.sign(payload, key)
  return token
}

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, key)
    return decoded 
  } catch (error) {
    throw new ServiceError("invalid token")
      .setStatusCode(StatusCode.Unauthorized)
  }
}


const roleFilter = (...roles: string[]) => async (ctx: ParameterizedContext, next: Next) => {
  const headers = ctx.header.authorization
  const token = headers?.substring(7) || ""
  const payload = verifyToken(token)
  // let role = ""
  // if (payload.academyRole != null) {
  //   role = payload.academyRole.role
  // }
  // if (roles.length == 0 || roles.includes(role)) {
  ctx.state.identity = payload
  await next()
  // } else {
  //   logger.error("unauthorized")
  //   throw new ServiceError("invalid token").setStatusCode(StatusCode.Unauthorized)
  //   return
  // }
}

export { roleFilter }
