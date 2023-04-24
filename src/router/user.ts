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
    const id = ctx.params.userId
    ctx.body = await userRepo.findOne({
      where: {
        id: id,
      },
      select: {
        groups: true,
      },
    })
  },

  async createToken(ctx: ParameterizedContext) {
    const id = ctx.params.userId
    const user = await userRepo.findOneBy({
      id: id,
    })
    const userPassword = await userRepo.findOneOrFail({
      where: {
        id: id,
      },
      select: {
        password: true,
      },
    })
    if (!user) {
      ctx.status = 404
      return
    }
    const password = ctx.request.body.password
    if (password != userPassword.password) {
      ctx.status = 401
      return
    }
    const token = genToken(JSON.parse(JSON.stringify(user)))
    ctx.body = Object.assign(user, { token })
  },

  async create(ctx: ParameterizedContext) {
    const req = ctx.request.body as Partial<User>
    const user = await userRepo.save(req)
    user.createdAt = new Date()
    const token = genToken(JSON.parse(JSON.stringify(user)))
    ctx.body = Object.assign(user, { token })
  },

  async update(ctx: ParameterizedContext) {
    const req = ctx.request.body as Partial<User>
    const userId = ctx.params.userId
    const user = await userRepo.findOneBy({
      id: userId,
    })
    if (user) {
      const updatedUser = await userRepo.save({ ...user, ...req })
      ctx.body = updatedUser
    } else {
      ctx.status = 404
    }
  },
}

export default UserRouter
