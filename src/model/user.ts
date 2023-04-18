import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { GroupUser } from "./group-user"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  address?: string

  @Column()
  port?: number

  @Column()
  password: string

  @OneToMany(() => GroupUser, groupUser => groupUser.user)
  userGroups?: GroupUser[]
}
