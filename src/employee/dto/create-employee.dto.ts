import { CreateUserDto } from "src/user/dto/createUserDto";
import { CivilStatus } from "../entities/employee.entity";
import { IsDate, IsEnum, IsNotEmpty,  } from "class-validator";

export class CreateEmployeeDto {
    @IsNotEmpty()
    experience: number;

    @IsNotEmpty()
    department: string;

    @IsDate()
    startDate: Date;

    @IsEnum(CivilStatus)
    civilStatus: CivilStatus;

    @IsNotEmpty()
    user: CreateUserDto
}
