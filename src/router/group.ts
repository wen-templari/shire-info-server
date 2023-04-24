import { ParameterizedContext } from "koa"
import AppDataSource from "../datatsource"
import { Group } from "../model/group"
import { User } from "../model/user"

const GroupRepo = AppDataSource.getRepository(Group)
const UserRepo = AppDataSource.getRepository(User)

const GroupRouter = {
  async create(ctx: ParameterizedContext) {
    const req = ctx.request.body as {
      ids: number[]
    }
    const group = GroupRepo.create({
      users: req.ids.map(id => UserRepo.create({ id: id })),
    })
    await GroupRepo.save(group)
    ctx.body = await GroupRepo.findOne({
      where: {
        id: group.id,
      },
      select: {
        users: true,
      },
    })
  },

  async getGroupById(ctx: ParameterizedContext) {
    const id = ctx.params.groupId
    ctx.body = await GroupRepo.findOne({
      where: {
        id,
      },
      select: {
        users: true,
      },
    })
  },
}
export default GroupRouter
