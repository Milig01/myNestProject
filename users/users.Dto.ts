// этот класс используеться для удобной передачи обьектов в нужные сервисы,
// стоит подумать над созданием конструктора
export class UserDto {
    constructor(userDto: {email: string, password: string}) {
        this.email = userDto.email;
        this.password = userDto.password;
    }

    readonly email: string;
    readonly password: string;
}