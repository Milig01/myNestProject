import { CreateProfileDto } from "./create_profile.Dto";

export class ProfileDto {
    constructor(createProfileDto: CreateProfileDto) {
        this.name = createProfileDto.name;
        this.surname = createProfileDto.surname;
        this.age = createProfileDto.age;
        this.phoneNumber = createProfileDto.phoneNumber;
    }

    readonly name: string;
    readonly surname: string;
    readonly age: number;
    readonly phoneNumber: string;
}