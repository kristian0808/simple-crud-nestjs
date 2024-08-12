import { User } from "src/user/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";

export enum CivilStatus {
    single = 'single',
    married = 'married',
    divorced = 'divorced',
}

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    experience: number;

    @Column()
    department: string;

    @Column({type: 'date'})
    startDate: Date;

    @Column({type: 'enum', enum: CivilStatus, default: CivilStatus.single})
    civilStatus: CivilStatus;

    @OneToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn()
    user: User;
}
