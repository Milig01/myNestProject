/*Этот модуль отвечает за авторизацию пользователей, здесь должен быть весь код отвечающий за авторизацию,
ролей пользователей, 

*/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt_auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // мы будем обращаться к базе данных, этот модуль необходим, и ему мы передаем модель
  providers: [
    UsersService,
    {provide: APP_GUARD, useClass: JwtAuthGuard},
    {provide: APP_GUARD, useClass: RolesGuard},
  ], // сервис предоставляет весь функционал по обработке пользователей и их авторизации
  exports: [UsersService] // к этому сервису будет обращаться сервис ProfileService, поэтому мы должны его экспортировать чтобы другой сервис мог им пользоваться
})
export class UsersModule {}
