import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm"
import { GroupUser } from "./group-user"
import { Group } from "./group"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({
    nullable: true,
  })
  address?: string

  @Column({
    nullable: true,
  })
  port?: number

  @Column({
    nullable: true,
  })
  rpcPort?: number

  @Column({
    select: false,
  })
  password: string

  // @OneToMany(() => GroupUser, groupUser => groupUser.user)
  // userGroups?: GroupUser[]

  @ManyToMany(() => Group, group => group.users)
  @JoinTable()
  groups: Group[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
