import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Role } from './roles.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private rolesRepository: Repository<Role>,
        @InjectRepository(User) private userRepository: Repository<User>,
        private usersService: UsersService
        ) {}

    async getUserRoles({id}) {
        return await this.userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.roles', 'role').where('user.id = :id', {id}).getOne();
    }

    async getRoleByName(name: string) {
        return await this.rolesRepository.createQueryBuilder('role')
        .where('role.name = :name', {name}).getOne();
    }

    async deleteRole(userEmail: string, roleName: string) {
        let user = await this.usersService.findUserByEmail(userEmail);
        let role = await this.getRoleByName(roleName);

        return await this.userRepository.createQueryBuilder()
        .relation(User, 'roles').of(user.id).remove(role.id);
    }

    async addRole(userEmail: string, roleName: string) {
        let user = await this.usersService.findUserByEmail(userEmail);
        let role = await this.getRoleByName(roleName);

        return await this.userRepository.createQueryBuilder()
        .relation(User, 'roles').of(user.id).add(role.id);
    }
}
