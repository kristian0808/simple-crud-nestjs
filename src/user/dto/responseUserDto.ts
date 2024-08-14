import { IsString, IsEmail, IsNotEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class ResponseUserDto {

    @IsString()
    @ApiProperty({ required: false })
    firstName?: string;

    @IsString()
    @ApiProperty({ required: false })
    lastName?: string;


    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string;
}




// we can define the shape of our body object