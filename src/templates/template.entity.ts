import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

export enum TemplateCategory {
  ECOMMERCE = "ecommerce",
  PORTFOLIO = "portfolio",
  BLOG = "blog",
  BUSINESS = "business",
  OTHER = "other",
}

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column("json")
  components: string

  @Column({
    type: "enum",
    enum: TemplateCategory,
    default: TemplateCategory.OTHER,
  })
  category: TemplateCategory

  @Column({ nullable: true })
  previewImageUrl: string
}

