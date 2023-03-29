// Здесь находятся маршруты по обработке авторизации
import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local_auth.guard';
import { CreateProfileDto } from './profiles/create_profile.Dto';
import { ProfileDto } from './profiles/profiles.Dto';
import { ProfilesService } from './profiles/profiles.service';
import { Public } from './public.decorator';
import { UserDto } from './users/users.Dto';
import { UsersService } from './users/users.service';

@Controller() // в качестве параметра нужно передать маршрут например: 'users'
export class AppController {
  constructor(
    private readonly authService: AuthService, //Внедряем зависимости
    private readonly profilesService: ProfilesService,
    private readonly usersService: UsersService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard) // локальная проверка пароля пользователя
  @Post('auth/login')
  async login(@Request() request) {
    return await this.authService.login(request.user); // возвращается токен
  }

  @Public()
  @Post('registration')
    async profileRegister(@Body() createProfileDto: CreateProfileDto) {
      let userDto = new UserDto(createProfileDto);
      await this.usersService.createUser(userDto);

      let profileDto = new ProfileDto(createProfileDto);

      return await this.profilesService.createProfile(profileDto);
    }

}
