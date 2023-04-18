import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user"
import { Group } from "./group"

@Entity()
export class GroupUser {
  @PrimaryGeneratedColumn()
  public postToCategoryId: number

  @Column()
  userPort?: number

  @ManyToOne(() => User, user => user.userGroups)
  user: User

  @ManyToOne(() => Group, group => group.groupUsers)
  group: Group
}
