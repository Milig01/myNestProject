import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/users.Dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
        ) {}

    async validateUser(userDto: UserDto): Promise<any> { // проверяем введенный пользователем пароль с сохраненным
        let user = await this.usersService.findUserByEmail(userDto.email);
        
        if (user && bcrypt.compareSync(userDto.password, user.hash)) {
            return {id: user.id, email: user.email};
        }

        return null;
    }

    async login(user: any) {
        let payload = {username: user.email, sub: user.id, roles: user.roles};

        return {acces_token: this.jwtService.sign(payload)};
    }
}
