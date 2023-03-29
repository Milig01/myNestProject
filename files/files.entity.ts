import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column({type: 'timestamptz'})
    createdAt: Date;

    @Column({nullable: true})
    essenceTable: string;

    @Column({nullable: true})
    essenceId: number;
}