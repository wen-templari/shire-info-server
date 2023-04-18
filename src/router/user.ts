import { ParameterizedContext } from "koa"
import AppDataSource from "../datatsource"
import { User } from "../model/user"
import { genToken } from "../util/auth"

const userRepo = AppDataSource.getRepository(User)

const UserRouter = {
  async getUsers(ctx: ParameterizedContext) {
    const users = await userRepo.find()
    ctx.body = users
  },

  async getByUserId(ctx: ParameterizedContext) {
    const userId = ctx.params.userId
    const user = await userRepo.findOneBy(userId)
    ctx.body = user
  },

  async createToken(ctx: ParameterizedContext) {
    const id = ctx.params.userId
    const user = await userRepo.findOne({
      where: {
        id
      },
      select: {
        password: true
      }
    })
    if (!user) {

      ctx.status = 404
      return
    } 
    const password = ctx.req.body.password
    if (password != user.password){
      ctx.status = 401
      return
    }
    const token = genToken(user)
    ctx.body = Object.assign(user,{token}) 
  },

  async create(ctx: ParameterizedContext) {
    const req = ctx.request.body as User
    const user = await userRepo.save(req)
    ctx.body = user
  },

  async update(ctx: ParameterizedContext) {
    const req = ctx.request.body as Partial<User>
    const userId = ctx.params.userId
    const user = await userRepo.findOneBy(userId)
    if (user) {
      const updatedUser = await userRepo.save({ ...user, ...req })
      ctx.body = updatedUser
    } else {
      ctx.status = 404
    }
  },
}

export default UserRouter
