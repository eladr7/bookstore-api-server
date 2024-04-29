import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Genre } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post(':genre')
  create(@Body(new ValidationPipe()) createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get(':genre')
  findAll(@Param('genre', new ParseEnumPipe(Genre)) genre: Genre) {
    return this.booksService.findAll(genre);
  }

  @Get(':genre/:id')
  findOne(
    @Param('genre', new ParseEnumPipe(Genre)) genre: Genre,
    @Param('id') id: string,
  ) {
    return this.booksService.findOne(genre, id);
  }

  @Delete(':genre/:id')
  remove(
    @Param('genre', new ParseEnumPipe(Genre)) genre: Genre,
    @Param('id') id: string,
  ) {
    return this.booksService.remove(genre, id);
  }
}
