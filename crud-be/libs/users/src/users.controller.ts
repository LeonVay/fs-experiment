import { Controller, Get, Param, Post, Body, Patch, UsePipes, ValidationPipe, ParseIntPipe, Delete } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { User } from "./repository/users.entity";
import { UsersService } from "./users.service";
import { CreateUsersDto } from "./dto/create-user.dto";
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from "./dto/delete-user.dto";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @Get('/:id')
    getOneUser(@Param('id') id: number): Promise<User> {
        return this.usersService.getUser(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUsersDto): Promise<User> {
        return this.usersService.createUser(createUserDto);
    }

    @Patch('/:id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<{firstName: string, login: string}> {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete()
    deleteUsers(@Body() deleteUserDto: DeleteUserDto): Promise<DeleteResult> {
        return this.usersService.deleteUsers(deleteUserDto);
    }
}
