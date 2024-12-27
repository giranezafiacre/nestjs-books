import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('users') // Table name
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    username: string; // Unique username for authentication
  
    @Column()
    password: string; // Store hashed passwords for security
  
    @Column({ default: 'user' })
    role: string; // Role for authorization (e.g., 'user', 'admin')
  
    @CreateDateColumn()
    createdAt: Date; // Automatically set when a record is created
  
    @UpdateDateColumn()
    updatedAt: Date; // Automatically updated when a record is updated
  }
  