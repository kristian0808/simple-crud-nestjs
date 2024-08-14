import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'firstName', nullable: true })
    firstName: string;

    @Column({ name: 'lastName', nullable: true })
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    @Column({})
    createdAt: Date;

    @DeleteDateColumn() //decorater for soft delete
    deletedAt: Date;

    @Column({ type: 'date', nullable: true })
    birthday: Date;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    state: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    street: string;


}
