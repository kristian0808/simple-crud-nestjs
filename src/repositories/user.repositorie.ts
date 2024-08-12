import { Repository, DataSource, SelectQueryBuilder } from 'typeorm';
import { User } from '../user/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/createUserDto';

export enum OrderDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum OrderByColumn {
    LASTNAME = 'lastName',
    STATE = 'state',
    FIRSTNAME = 'firstName',
}

export interface filters {
    firstname?: string;
    lastname?: string;
    state?: string;
}
@Injectable()
export class UserRepository extends Repository<User> {


    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }
    
    findAllWithFilters(
        
        page: number,
        limit: number,
        filters: filters,
        order?: OrderDirection,
        orderByColumn?: OrderByColumn 

    ): SelectQueryBuilder<User> {
        let query = this.createQueryBuilder('user')

        if (filters.firstname) {
            query.andWhere('user.firstName ILIKE :firstname', { firstname: `%${filters.firstname}%` });
        }

        if (filters.lastname) {
            query.andWhere('user.lastName ILIKE :lastname', { lastname: `%${filters.lastname}%` });
        }

        if (filters.state) {
            query.andWhere('user.state ILIKE :state', { state: `%${filters.state}%` });
        }

        query = query
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy(orderByColumn ? `user.${orderByColumn}` : 'user.id', order)
        
            // .orderBy(`'user.${orderByColumn}'`, order) // duhet parameter ne vend te user.id sepse ne duam colone specifike


        return query;
        //   .getManyAndCount();
    }
}

