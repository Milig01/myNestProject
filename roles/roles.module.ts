import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt_auth.guard';
import { RolesGuard } from './roles.guard';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, User]),
    UsersModule
  ],
  providers: [
    RolesService,
    {provide: APP_GUARD, useClass: JwtAuthGuard},
    {provide: APP_GUARD, useClass: RolesGuard},
  ],
  controllers: [RolesController],
  exports: [RolesService]
})
export class RolesModule {}