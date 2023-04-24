import { CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./user"

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToMany(() => User, user => user.groups, {
    eager: true,
  })
  users: User[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
