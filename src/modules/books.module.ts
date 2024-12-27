import { Module } from '@nestjs/common';
// import { BooksService } from './books.service';
import { BooksController } from '../controller/books.controller';
import { BooksService } from '../service/books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
