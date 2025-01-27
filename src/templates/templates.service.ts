import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import { Template, type TemplateCategory } from "./template.entity"

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template)
    private templatesRepository: Repository<Template>,
  ) {}

  async findAll(): Promise<Template[]> {
    return this.templatesRepository.find()
  }

  async findOne(id: number): Promise<Template> {
    return this.templatesRepository.findOne({ where: { id } })
  }

  async create(template: Partial<Template>): Promise<Template> {
    const newTemplate = this.templatesRepository.create(template)
    return this.templatesRepository.save(newTemplate)
  }

  async update(id: number, template: Partial<Template>): Promise<Template> {
    await this.templatesRepository.update(id, template)
    return this.templatesRepository.findOne({ where: { id } })
  }

  async remove(id: number): Promise<void> {
    await this.templatesRepository.delete(id)
  }

  async findByCategory(category: TemplateCategory): Promise<Template[]> {
    return this.templatesRepository.find({ where: { category } })
  }
}

