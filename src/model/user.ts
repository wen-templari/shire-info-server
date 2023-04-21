import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { GroupUser } from "./group-user"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({
    nullable: true
  })
  address?: string

  @Column({
    nullable: true
  })
  port?: number

  @Column({
    select: false
  })
  password: string

  @OneToMany(() => GroupUser, groupUser => groupUser.user)
  userGroups?: GroupUser[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
