// src/data-source.ts
import { DataSource } from 'typeorm';
import { Book } from './entities/book.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',  // Adjust if you're using a different database
  host: 'localhost', // Adjust to your DB host
  port: 5432,        // Adjust to your DB port
  username: 'postgres', // Your database username
  password: '', // Your database password
  database: 'book_store', // Your database name
  entities: [Book], // Include all entities here
  synchronize: false,  // Don't use synchronize in production
  logging: true,  // Set to true if you want to log queries
});
