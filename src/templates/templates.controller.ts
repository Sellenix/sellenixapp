import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common"
import type { TemplatesService } from "./templates.service"
import type { Template } from "./template.entity"
import { RolesGuard } from "../auth/roles.guard"
import { Roles } from "../auth/roles.decorator"
import { UserRole } from "../users/user.entity"

@Controller("templates")
@UseGuards(RolesGuard)
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  findAll() {
    return this.templatesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.templatesService.findOne(+id);
  }

  @Post()
  @Roles(UserRole.SUPERADMIN)
  create(@Body() template: Partial<Template>) {
    return this.templatesService.create(template);
  }

  @Patch(":id")
  @Roles(UserRole.SUPERADMIN)
  update(@Param('id') id: string, @Body() template: Partial<Template>) {
    return this.templatesService.update(+id, template)
  }

  @Delete(':id')
  @Roles(UserRole.SUPERADMIN)
  remove(@Param('id') id: string) {
    return this.templatesService.remove(+id);
  }
}

