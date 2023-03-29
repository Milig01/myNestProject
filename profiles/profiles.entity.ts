import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

//Сущность, описывающая профиль пользователя
@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    age: number;

    @Column({unique: true})
    phoneNumber: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User
}