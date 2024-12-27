import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Find a user by username
   * @param username - The username to search for
   * @returns User or undefined
   */
  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  /**
   * Create a new user
   * @param user - Partial user object containing username, password, and role
   * @returns The created user
   */
  async create(user: Partial<User>): Promise<User> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt); // Hash the password
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  /**
   * Validate a user's password
   * @param password - Plaintext password
   * @param hashedPassword - Hashed password from the database
   * @returns true if the password is valid, false otherwise
   */
  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Find a user by ID
   * @param id - User ID
   * @returns User or undefined
   */
  // Find a single user by ID
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Update a user's role
   * @param id - User ID
   * @param role - New role to assign to the user
   * @returns Updated user or null if not found
   */
  async updateRole(id: number, role: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return null;
    }
    user.role = role;
    return this.userRepository.save(user);
  }

  /**
   * Delete a user by ID
   * @param id - User ID
   * @returns true if deletion was successful, false otherwise
   */
  // Remove a user by ID
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id); // Ensure the user exists
    await this.userRepository.remove(user);
  }

}
