import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Book } from '../entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(
    title: string,
    author: string,
    publishedYear: number,
  ): Promise<Book> {
    try {
      const book = new Book();
      book.title = title;
      book.author = author;
      book.publishedYear = publishedYear;

      const newBook = await this.booksRepository.save(book);
      return newBook;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key value violates unique constraint')
      ) {
        throw new Error(
          'A book with this title already exists. Please choose a different title.',
        );
      }
      throw error; // rethrow the error if it's not a unique constraint violation
    }
  }

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }
    return book;
  }

  async update(
    id: number,
    updateBookDto: Omit<UpdateBookDto, 'id'>,
  ): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }
    const updatedBook = Object.assign(book, updateBookDto);
    return this.booksRepository.save(updatedBook);
  }

  async remove(id: number): Promise<void> {
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }
    await this.booksRepository.remove(book);
  }
}
