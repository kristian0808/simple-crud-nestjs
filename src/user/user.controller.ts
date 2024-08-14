import { Controller, Get, Post, Put, Delete, Body, Param , Query} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUserDto';
import { OrderByColumn, OrderDirection } from 'src/repositories/user.repositorie';
import { UpdateUserDto } from './dto/updateUserDto';
import { ResponseUserDto } from './dto/responseUserDto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiBody({ type: CreateUserDto })
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users with filters' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'firstname', required: false, type: String })
    @ApiQuery({ name: 'lastname', required: false, type: String })
    @ApiQuery({ name: 'state', required: false, type: String })
    @ApiQuery({ name: 'order', required: false, enum: OrderDirection})
    @ApiQuery({ name: 'orderByColumn', required: false, enum: OrderByColumn})
    findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number  = 10,
        @Query('firstname') firstname: string,
        @Query('lastname') lastname: string,
        @Query('state') state: string,
        @Query('order') order: OrderDirection,
        @Query('orderByColumn') orderByColumn: OrderByColumn
        
    ) {
        return this.userService.findAll(page, limit, {firstname, lastname, state}, order, orderByColumn);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update user by ID' })
    update(@Param('id') id: string, @Body() createUserDto: UpdateUserDto) {
        return this.userService.update(+id, createUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user by ID' })
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }

    @Delete(':id/soft')
    @ApiOperation({ summary: 'Soft delete user by ID' })
    softDelete(@Param('id') id: string) {
        return this.userService.softDelete(+id);
    }
}