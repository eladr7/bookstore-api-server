import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  ParseEnumPipe,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Genre } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post(':genre')
  async create(@Body(new ValidationPipe()) createBookDto: CreateBookDto) {
    try {
      return await this.booksService.create(createBookDto);
    } catch (error) {
      throw new InternalServerErrorException(
        'Book creation failed: ' + error.message,
      );
    }
  }

  @Get(':genre')
  async findAllByGenre(@Param('genre', new ParseEnumPipe(Genre)) genre: Genre) {
    try {
      const books = await this.booksService.findAllByGenre(genre);
      // if (books.length === 0) {
      //   throw new NotFoundException('No books found');
      // }
      return books;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch books: ' + error.message,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const books = await this.booksService.findAll();
      // if (books.length === 0) {
      //   throw new NotFoundException('No books found');
      // }
      return books;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch books: ' + error.message,
      );
    }
  }

  @Get(':genre/:id')
  async findOne(
    @Param('genre', new ParseEnumPipe(Genre)) genre: Genre,
    @Param('id') id: string,
  ) {
    try {
      const book = await this.booksService.findOne(genre, id);
      // if (!book) {
      //   throw new NotFoundException('Book not found');
      // }
      return book;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch book: ' + error.message,
      );
    }
  }

  @Delete(':genre/:id')
  async remove(
    @Param('genre', new ParseEnumPipe(Genre)) genre: Genre,
    @Param('id') id: string,
  ) {
    try {
      const deletedBook = await this.booksService.remove(genre, id);
      if (!deletedBook) {
        throw new NotFoundException('Book not found');
      }
      return deletedBook;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to remove book: ' + error.message,
      );
    }
  }
}
