import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

 
  @Roles(Role.DEVELOPER)
  @Post()
  create(@Body() body: any) {
    return this.usersService.create(body);
  }

  @Roles(Role.DEVELOPER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.update(+id, body);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id/make-admin')
  makeAdmin(@Param('id') id: string) {
    return this.usersService.updateRole(+id, Role.ADMIN);
  }

  @Get()
  findAll(@Request() req) {
    const user = req.user;
    
    if (user.role === Role.ADMIN || user.role === Role.DEVELOPER) {
      return this.usersService.findAll();
    }
    
    return this.usersService.findOne(user.id).then(res => [res]);
  }
}