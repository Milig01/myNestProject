import { Body, Controller, Delete, Get, Param, Post, Request } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @Get()
    async getOurRoles(@Request() request) { // просмотреть наши роли
        let userRoles = await this.rolesService.getUserRoles(request.user);
        
        return userRoles.roles;
    }

    @Roles('Admin')
    @Get(':id')
    async getUserRolesById(@Param('id') id: number) { // посмотреть роли пользователя по id
        let userRoles = await this.rolesService.getUserRoles({id});
        
        return userRoles.roles;
    }

    @Post()
    @Roles('Admin')
    async addRole(@Body() {userEmail, roleName}) { // установить роль roleName, пользователю с email = userEmail
        return await this.rolesService.addRole(userEmail, roleName);
    }

    @Delete()
    @Roles('Admin')
    async deleteUserRole(@Body() {userEmail, roleName}) {// удалить у пользователя эту роль
        return await this.rolesService.deleteRole(userEmail, roleName);
    }
}
