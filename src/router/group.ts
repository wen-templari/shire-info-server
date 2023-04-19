import { ParameterizedContext } from "koa"
import AppDataSource from "../datatsource"
import { Group } from "../model/group"
import { GroupUser } from "../model/group-user"

const GroupRepo = AppDataSource.getRepository(Group)
const GroupUserRepo = AppDataSource.getRepository(GroupUser)

const GroupRouter = {
  async create(ctx: ParameterizedContext) {
    const req = ctx.request.body as {
      userId:number
    }[]
    const groupUsers = req.map(userId=>{
      return GroupUserRepo.create(userId)
    }) 
    const group = await GroupRepo.save({
      groupUsers: groupUsers
    })
    ctx.body = group

  },
  
  async updateGroupUser(ctx: ParameterizedContext) {
    const req = ctx.request.body as { userPort : number}
    const userId = ctx.params.userId as number
    const groupId = ctx.params.groupId as number
    await GroupUserRepo.update({
      user: {
        id: userId
      },
      group: {
        id: groupId
      }
    },req)
    ctx.body = await GroupRepo.findOneBy({id: groupId})
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
