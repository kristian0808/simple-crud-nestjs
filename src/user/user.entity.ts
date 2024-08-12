import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'firstName',nullable: true })
    firstName: string;

    @Column({ name: 'lastName',nullable: true})
    lastName: string;

    @Column()
    email: string;

    @Column()
    username: string;
    
    @Column()
    password: string;
    
    @Column({})
    createdAt: Date;

    @DeleteDateColumn() //decorater for soft delete
    deletedAt: Date;
    
    @Column({ type: 'date', nullable: true } )
    birthday: Date;

    @Column({ nullable: true } )
    address: string;

    @Column({ nullable: true } )
    state: string;

    @Column({ nullable: true } )
    city: string;

    @Column({nullable: true} )
    street: string;
    

}
