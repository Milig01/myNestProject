import { SetMetadata } from "@nestjs/common";

export let Public = () => SetMetadata('isPublic', true);

//этот декоратор нужен для обхода защиты jwt в app.controller к маршрутам регистрации и авторизации