import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';
import { CivilStatus } from '../entities/employee.entity';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';

// export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {} // use extends partial type to copy and make it opsional 
export class UpdateEmployeeDto {
    @IsNotEmpty()
    experience: number;

    @IsNotEmpty()
    department: string;

    @IsDate()
    startDate: Date;

    @IsEnum(CivilStatus)
    civilStatus: CivilStatus;
}
