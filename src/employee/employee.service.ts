import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository, QueryRunner, DataSource } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/repositories/user.repositorie';
import { User } from 'src/user/user.entity';
// import * as bcrypt from 'bcrypt';
import { hashPassword } from 'src/utilities/password.util';
import { plainToClass } from 'class-transformer';

@Injectable()
export class EmployeeService {

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
            const user = queryRunner.manager.create(User, createEmployeeDto.user);
            const savedUser = await queryRunner.manager.save(user);

            //Create and save employee
            const newEmployee = queryRunner.manager.create(Employee, {
                ...createEmployeeDto,
                user: savedUser
            });
            const savedEmployee = await queryRunner.manager.save(newEmployee);

            //Commit the transaction
            await queryRunner.commitTransaction();

            return plainToClass(CreateEmployeeDto, savedEmployee);

        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new Error(`Failed to create employee: ${error.message}`);
        } finally {
            await queryRunner.release();
        }
    }

    findAll() {
        const employee = this.employeeRepository.find({ relations: ['user'] });

        return employee;
    }

    async findOne(id: number) {
        const employee = await this.employeeRepository.findOne({ where: { id }, relations: ['user'] });

        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }

        return employee
    }


    async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<UpdateEmployeeDto> {
        const employee = await this.employeeRepository.findOne({ where: { id } });

        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }

        // Update employee with the new values
        this.employeeRepository.merge(employee, updateEmployeeDto);

        const updatedEmployee = await this.employeeRepository.save(employee);

        return plainToClass(UpdateEmployeeDto, updatedEmployee);
    }


    async remove(id: number): Promise<void> {
        const employee = await this.employeeRepository.findOne({
            where: { id },
            relations: ['user'],
        });

        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }

        try {
            await this.employeeRepository.delete(id);
        } catch (error) {
            throw new Error(`Failed to delete employee with ID ${id}: ${error.message}`);
        }
    }


    async calculateVacationDays(id: number): Promise<number> {
        const employee = await this.employeeRepository.findOne({ where: { id: id }, relations: ['user'] });

        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }

        //calculate milliseconds for a day
        const oneDay: number = 24 * 60 * 60 * 1000;

        const today: Date = new Date();
        const startDate: Date = new Date(employee.startDate);
        
        //calculate difference in milliseconds
        const timeDiff: number = today.getTime() - startDate.getTime();

        //calculate difference in days
        const daysWorked: number = Math.floor(timeDiff / oneDay);

        //accrued vacation days per year 
        const vacationDaysPerDay: number = 24 / 365
        //calculate vacation days based on days worked
        const vacationDays = daysWorked * vacationDaysPerDay;

        return Math.ceil(vacationDays);
        
    }
        
    
}
