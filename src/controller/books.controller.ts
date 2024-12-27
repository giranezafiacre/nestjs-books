import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BooksService } from '../service/books.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

const BASEURL = 'api/v0/';
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post(BASEURL)
  async create(
    @Body()
    createBookDto: {
      title: string;
      author: string;
      publishedYear: number;
    },
  ) {
    try {
      const createdBook=await this.booksService.create(
        createBookDto.title,
        createBookDto.author,
        createBookDto.publishedYear,
      );
      return { 
        message: 'Book created successfully!',
        data:createdBook
       };
    } catch (error) {
      return { message: error.message }; // Return custom error message
    }
  }

  @Get(BASEURL)
  findAll() {
    return this.booksService.findAll();
  }

  @Get(BASEURL + ':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Put(BASEURL + ':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(BASEURL + ':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
