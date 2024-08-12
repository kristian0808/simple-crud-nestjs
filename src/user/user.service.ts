import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUserDto';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { UserRepository, OrderDirection, OrderByColumn } from 'src/repositories/user.repositorie';
import { UpdateUserDto } from './dto/updateUserDto';


@Injectable()
export class UserService {
    constructor(
        // @InjectRepository(User)
        private userRepository: UserRepository ,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        return this.userRepository.save(newUser);
    }

    async findAll(
        page: number, 
        limit: number, 
        filters: {
            firstname?: string;
            lastname?: string;
            state?: string;
        }, 
        order?: OrderDirection,
        orderByColumn?: OrderByColumn 
    ): Promise<{
        data: CreateUserDto[],
        total: number,
        page: number,
        limit: number,
        totalPages: number,
        order: OrderDirection
    }> {
        const [data, total] = await this.userRepository.findAllWithFilters(page, limit, filters, order, orderByColumn).getManyAndCount();

        return { 
            data: data.map(el=>plainToClass(CreateUserDto, el)), 
            total: total, 
            page: page, 
            limit: limit, 
            totalPages: Math.ceil(total / limit),
            order: order
        };
    }

    async findOne(id: number): Promise<CreateUserDto> {
        return this.userRepository.findOneOrFail({ where: { id: id } });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateUserDto> {
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        await this.userRepository.update(id, updateUserDto); //mund te perdoresh dhe save
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    async softDelete(id: number): Promise<void> {
        await this.userRepository.softDelete(id);
    }
}