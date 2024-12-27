import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, NotFoundException } from '@nestjs/common';
// import { UserService } from './user.service';
// import { User } from './user.entity';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserService } from 'src/service/user.service';
import { User } from 'src/entities/user.entity';

const BASEURL = 'users/api/v0'; // Define it correctly
@Controller(BASEURL)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get all users (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Get a single user by ID (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  // Create a new user
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  // Update a user by ID (protected)
  @UseGuards(JwtAuthGuard)
  @Put(BASEURL+':id/role')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: { role: string },
  ): Promise<User> {
    const updatedUser = await this.userService.updateRole(+id, updateUserDto.role);
    if (!updatedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return updatedUser;
  }

  // Delete a user by ID (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(BASEURL+':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.userService.remove(+id);
  }
}
