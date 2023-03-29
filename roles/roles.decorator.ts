import { SetMetadata } from "@nestjs/common";

export let Roles = (...roles: string[]) => SetMetadata('roles', roles);