import { Strategy } from "passport-local";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { UserDto } from "src/users/users.Dto";
import { RolesService } from "src/roles/roles.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        private readonly rolesService: RolesService
        ) {
        super({usernameField: 'email'});
    }

    async validate(email: string, password: string) { //возвращаем юзера с ролями
        let userDto = new UserDto({email, password});
        let user = await this.authService.validateUser(userDto);

        if (!user) throw new UnauthorizedException();

        let userRoles = await this.rolesService.getUserRoles(user);
        let roles: string[] = userRoles.roles.map(item => item.name);
        user['roles'] = roles;

        return user;
    }
}