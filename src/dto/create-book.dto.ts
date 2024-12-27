import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty({ message: 'Title cannot be empty' }) // Title is required
  @IsString({ message: 'Title must be a string' }) // Title must be a string
  title: string;

  @IsNotEmpty({ message: 'Author cannot be empty' })  // Author is required
  @IsString({ message: 'Author must be a string' })  // Author must be a string
  author: string;

  @IsInt({ message: 'Published Year must be an integer' })  // Published Year must be an integer
  @Min(1900, { message: 'Published Year must be after 1900' })  // Ensure the year is realistic
  @Max(new Date().getFullYear(), { message: 'Published Year cannot be in the future' })  // Year should not be in the future
  publishedYear: number;
}
