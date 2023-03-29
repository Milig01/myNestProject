import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // токен в заголовке Bearer Token
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY
        });
    }

    async validate(payload: any) { // сюда передается расшифрованный через секретный ключ токен (пэйлоад)
        let user = {id: payload.sub, email: payload.username, roles: payload.roles};

        return user;
    }
}