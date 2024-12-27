import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()  // Marks the class as a database entity
@Unique(["title"])  // Enforces uniqueness for the "title" column
export class Book {

  @PrimaryGeneratedColumn()  // Automatically generates an ID for each new book
  id: number;

  @Column({ type: 'varchar', length: 255 })  // Defines the column with the type and constraints
  title: string;

  @Column({ type: 'varchar', length: 255 })  // Column for author
  author: string;

  @Column({ type: 'int' })  // Column for published year (integer type)
  publishedYear: number;

}
