import { Body, Controller, Delete, Get, Param, Put, Request } from '@nestjs/common';
import { Roles } from 'src/roles/roles.decorator';
import { UserDto } from './users.Dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Put()
    async updateOurProfile(@Body() userDto: UserDto, @Request() request) {
        return await this.usersService.updateUser(userDto, request.user.id)
    }

    @Delete()
    async deleteOurProfile(@Request() request) {
        return await this.usersService.deleteUser(request.user.id);
    }

    @Roles('Admin')
    @Delete(':id')
    async deleteProfile(@Param('id') id: number) {
        return await this.usersService.deleteUser(id);
    }
}
