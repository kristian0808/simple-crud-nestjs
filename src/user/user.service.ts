import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUserDto';
import { plainToClass } from 'class-transformer';
import { UserRepository, OrderDirection, OrderByColumn } from 'src/repositories/user.repositorie';
import { UpdateUserDto } from './dto/updateUserDto';
import { ResponseUserDto } from './dto/responseUserDto';


@Injectable()
export class UserService {
    restore(id: number) {
        throw new Error('Method not implemented.');
    }
    constructor(
        // @InjectRepository(User)
        private userRepository: UserRepository ,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
        const newUser = this.userRepository.create(createUserDto);
        const savedUser = await this.userRepository.save(newUser);
        return this.mapToResponseDto(savedUser);
    }

    private mapToResponseDto(user: User): ResponseUserDto {
        const { firstName, lastName, email, username } = user;
        return { firstName, lastName, email, username };
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
        data: ResponseUserDto[],
        total: number,
        page: number,
        limit: number,
        totalPages: number,
        order: OrderDirection
    }> {
        const [data, total] = await this.userRepository.findAllWithFilters(page, limit, filters, order, orderByColumn).getManyAndCount();

        return { 
            data: data.map(el=>plainToClass(ResponseUserDto, el)), 
            total: total, 
            page: page, 
            limit: limit, 
            totalPages: Math.ceil(total / limit),
            order: order
        };
    }

    async findOne(id: number): Promise<ResponseUserDto> {
        const user = await this.userRepository.findOneOrFail({ where: { id: id } });

        return this.mapToResponseDto(user);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
        const user = await this.userRepository.findOne({ where: { id: id } });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        const updatedUser = this.userRepository.merge(user, updateUserDto);
        await this.userRepository.save(updatedUser);

        return this.mapToResponseDto(updatedUser);
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    async softDelete(id: number): Promise<void> {
        await this.userRepository.softDelete(id);
    }
}