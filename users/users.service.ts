// здесь должна быть вся логика связанная с users
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { UserDto } from './users.Dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>) {} // внедряем репозиторий, с его помощью и происходит непосредственное обращение к базе данных

    async findUserByEmail(email: string) { // находим пользователя по email
        return await this.usersRepository.createQueryBuilder('user')
        .where('user.email = :email', {email}).getOne();
    }

    async createUser(userDto: UserDto) { // возвращает уже существующего пользователя, либо создает нового, если нет нарушений уникальности
        let salt = String( await bcrypt.genSalt() );
        let hash = await bcrypt.hash(userDto.password, salt);

        return await this.usersRepository.createQueryBuilder()
        .insert().into(User).values({email: userDto.email, hash}).execute();
    }

    async updateUser(userDto: UserDto, id: number) {
        let salt = String( await bcrypt.genSalt() );
        let hash = await bcrypt.hash(userDto.password, salt);

        return await this.usersRepository.createQueryBuilder()
        .update(User).set({email: userDto.email, hash}).where("id = :id", {id}).execute();
    }

    async deleteUser(id: number) {
        return await this.usersRepository.createQueryBuilder('profile')
        .delete().from(User).where('id = :id', {id}).execute();
    }
}
