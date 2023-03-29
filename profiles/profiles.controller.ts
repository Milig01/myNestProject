import { Body, Controller, Get, Request, Put, Delete, Param } from '@nestjs/common';
import { Roles } from 'src/roles/roles.decorator';
import { ProfileDto } from './profiles.Dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
    constructor(
        private readonly profilesService: ProfilesService,
    ) {}
    
    @Get()
    async getOurProfile(@Request() request) { // получить профиль с которого авторизовались
        return await this.profilesService.getOne(request.user.id);
    }

    @Put()
    async updateOurProfile(@Body() profileDto: ProfileDto, @Request() request) {
        return await this.profilesService.updateProfile(profileDto, request.user.id)
    }

    @Delete()
    async deleteOurProfile(@Request() request) {
        return await this.profilesService.deleteProfile(request.user.id);
    }

    @Roles('Admin')
    @Get(':id') // получить либо по id либо всех, указав all
    async getOneProfile(@Param('id') id: string) {
        if (id == 'all') return await this.profilesService.getAll();

        return await this.profilesService.getOne(+id);
    }

    @Roles('Admin')
    @Delete(':id')
    async deleteProfile(@Param('id') id: number) {
        return await this.profilesService.deleteProfile(id);
    }
}
