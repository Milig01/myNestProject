import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Profile } from './profiles/profiles.entity';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { User } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.entity';
import { TextBlockModule } from './text_block/text_block.module';
import { TextBlock } from './text_block/text_block.entity';
import { FilesModule } from './files/files.module';
import { File } from './files/files.entity'

@Module({
  imports: [UsersModule, // Все модули, которые используются в приложении, должны ОБЯЗАТЕЛЬНО импортироваться сюда, в главный модуль всего приложения.
  ConfigModule.forRoot({ // Этот модуль нужен для добавления всех переменных среды, которые скрыты и храняться в файле .data.env
    envFilePath: `.${process.env.NODE_ENV}.env`,
  }),
  TypeOrmModule.forRoot({ // модуль typeORM, его мы используем для взаимодействия с той базой данных, которую мы указали в database
  type: 'postgres',
  host: process.env.PG_HOST,
  port: +process.env.PG_PORT,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  entities: [Profile, User, Role, TextBlock, File],
  }),
  ProfilesModule,
  AuthModule,
  RolesModule,
  TextBlockModule,
  FilesModule,
],
  controllers: [AppController], //контроллеры отвечают за маршрутизацию и обработку информации по определенному маршруту
  providers: [AppService], //сюда подключаются все сервисы, которые будут использоваться этим модулем.
})
export class AppModule {}
