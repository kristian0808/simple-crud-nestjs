import { IsString, IsEmail, IsNotEmpty, MinLength, IsDate, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {

    @IsString()
    @ApiProperty({ required: false })
    firstName?: string;

    @IsString()
    @ApiProperty({required: false})
    lastName?: string;

    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    password: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    birthday?: Date;

    @ApiProperty({ required: false })
    @IsString()
    address?: string;

    @ApiProperty({required: false})
    @IsString()
    state?: string;

    @ApiProperty({ required: false })
    @IsString()
    city?: string;

    @ApiProperty({ required: false })
    @IsString()
    street?: string;
}
    



// we can define the shape of our body object