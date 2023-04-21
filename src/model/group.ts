import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { GroupUser } from "./group-user"

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => GroupUser, groupUser => groupUser.group,{
    eager: true,
    cascade: true
  })
  groupUsers: GroupUser[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
