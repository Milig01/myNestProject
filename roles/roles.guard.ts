import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean { // проверка наличия ролей у пользователя
        let requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(),
            context.getClass()
        ]);

        if (!requiredRoles) return true;

        let {user} = context.switchToHttp().getRequest();

        return requiredRoles.some(role => user.roles?.includes(role));
    }
}