import { Role } from "src/roles/roles.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

//Сущность, описывающая данные авторизации пользователя
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    hash: string;

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[];
}