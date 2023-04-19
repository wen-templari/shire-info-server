import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user"
import { Group } from "./group"

@Entity()
export class GroupUser {
  @PrimaryGeneratedColumn()
  public postToCategoryId: number

  @Column({
    nullable: true
  })
  userPort?: number

  @Column()
  userId:number

  @ManyToOne(() => User, user => user.userGroups,{
    eager: true
  })
  user: User

  @ManyToOne(() => Group, group => group.groupUsers)
  group: Group
}
