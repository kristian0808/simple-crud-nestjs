import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository, Connection, QueryRunner, DataSource } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/repositories/user.repositorie';
import { User } from 'src/user/user.entity';

@Injectable()
export class EmployeeService {
    userRepository: any;

    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
        private userService: UserService,
        private dataSource: DataSource,
    ) { }


    async create(createEmployeeDto: CreateEmployeeDto): Promise<CreateEmployeeDto> {
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();


        try {
            //Create and save user
            const user = queryRunner.manager.create(User, createEmployeeDto.user)
            const savedUser = await queryRunner.manager.save(user);

            //Create and save employee
            const newEmployee = queryRunner.manager.create(Employee, {
                ...createEmployeeDto,
                user: savedUser
            });
            const savedEmployee = await queryRunner.manager.save(newEmployee);

            //Commit the transaction
            await queryRunner.commitTransaction();

            return savedEmployee;

        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    findAll() {
        return `This action returns all employee`;
    }

    findOne(id: number) {
        return `This action returns a #${id} employee`;
    }

    update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
        return `This action updates a #${id} employee`;
    }

    async remove(id: number): Promise<void> {
        const employee = await this.employeeRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        
        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }

        
        await this.employeeRepository.remove(employee);
    }

    async softDelete(id: number): Promise<void> {
        await this.employeeRepository.softDelete(id);
    }
}
