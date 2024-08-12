import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { Employee } from './entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repositorie';

@Module({
    imports: [TypeOrmModule.forFeature([Employee]), UserModule],
    controllers: [EmployeeController],
    providers: [EmployeeService, UserService, UserRepository],
})
export class EmployeeModule { }
