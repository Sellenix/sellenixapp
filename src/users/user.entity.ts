import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Product } from "../products/product.entity"
import { Order } from "../orders/order.entity"

export enum UserRole {
  SUPERADMIN = "superadmin",
  ADMIN = "admin",
  RESELLER = "reseller",
  MERCHANT = "merchant",
  GUEST = "guest",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column({ nullable: true })
  password: string

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.GUEST,
  })
  role: UserRole

  @Column({ nullable: true })
  googleId: string

  @Column({ nullable: true })
  facebookId: string

  @Column({ default: false })
  twoFactorAuthEnabled: boolean

  @Column({ nullable: true })
  twoFactorAuthSecret: string

  @OneToMany(
    () => Product,
    (product) => product.merchant,
  )
  products: Product[]

  @OneToMany(
    () => Order,
    (order) => order.customer,
  )
  orders: Order[]
}

