import { ParameterizedContext } from "koa"
import AppDataSource from "../datatsource"
import { Group } from "../model/group"
import { GroupUser } from "../model/group-user"

const GroupRepo = AppDataSource.getRepository(Group)
const GroupUserRepo = AppDataSource.getRepository(GroupUser)

const GroupRouter = {
  async create(ctx: ParameterizedContext) {
    // TODO not implemented
  },
  
  async updateGroupUser(ctx: ParameterizedContext) {
    const req = ctx.request.body as { userPort : number}
    const groupUserId = ctx.params.groupUserId  as number
    await GroupUserRepo.update(groupUserId,req)
  },

  async deleteGroupUser(ctx: ParameterizedContext) {
    // TODO not implemented
  },

  async getGroupById(ctx: ParameterizedContext) {
    const id = ctx.params.groupId
    ctx.body = await GroupRepo.findOne({
      where: {
        id
      },
      select: {
        groupUsers: true
      }
    })
  },
}
export default GroupRouter
