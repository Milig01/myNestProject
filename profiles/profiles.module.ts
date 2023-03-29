import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ProfilesController } from './profiles.controller';
import { Profile } from './profiles.entity';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    UsersModule // наш ProfileService обращаеться к UsersService, нам необходимо тот модуль сюда импортировать, чтобы nest разрешил зависимости
  ],
  controllers: [ProfilesController], // отвечает за все марщруты связанные с профилем
  providers: [ProfilesService], // вся логика по работе с профилем
  exports: [ProfilesService]
})
export class ProfilesModule {}
