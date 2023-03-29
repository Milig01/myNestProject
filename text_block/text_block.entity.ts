import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TextBlock {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    uniqName: string;

    @Column()
    name: string;

    @Column({nullable: true})
    imageName: string;

    @Column({nullable: true})
    text: string;

    @Column({nullable: true})
    group: string;
}