import { IsString, IsEmail, IsNotEmpty, MinLength, IsDate, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './createUserDto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    // @IsString()
    // @IsOptional()
    // @ApiPropertyOptional()
    // firstname?: string;

    // @IsString()
    // @IsOptional()
    // @ApiPropertyOptional()
    // lastname?: string;

    // @IsEmail()
    // @IsNotEmpty()
    // @ApiProperty({required: true})
    // email: string;

    // @IsString()
    // @IsNotEmpty()
    // @ApiProperty({ required: true })
    // username: string;

    // @IsString()
    // @IsOptional()
    // @MinLength(8)
    // @ApiPropertyOptional()
    // password?: string;

    // @ApiPropertyOptional()
    // @IsDate()
    // @IsOptional()
    // birthday?: Date;

    // @ApiPropertyOptional()
    // @IsString()
    // @IsOptional()
    // address?: string;

    // @ApiPropertyOptional()
    // @IsString()
    // @IsOptional()
    // state?: string;

    // @ApiPropertyOptional()
    // @IsString()
    // @IsOptional()
    // city?: string;

    // @ApiPropertyOptional()
    // @IsString()
    // @IsOptional()
    // street?: string;
}