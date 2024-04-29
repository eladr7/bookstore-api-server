import { Injectable } from '@nestjs/common';
import { CreateBookDto, Genre } from './dto/create-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  private books: Book[] = [
    { id: '1', name: 'cunt1', genre: Genre.Satire },
    { id: '2', name: 'cunt2', genre: Genre.Mystery },
  ];
  create(createBookDto: CreateBookDto) {
    const newBook: Book = {
      id: Math.random().toString(),
      name: createBookDto.name,
      genre: createBookDto.genre,
    };
    this.books.push(newBook);

    return newBook;
  }

  findAll(genre: Genre) {
    return this.books.filter((book: Book) => book.genre === genre);
  }

  findOne(genre: string, id: string) {
    return this.books.find((book: Book) => book.id === id);
  }

  remove(genre: string, id: string) {
    const bookToRemove = this.books.find((book: Book) => book.id === id);
    this.books = this.books.filter((book: Book) => book.id !== id);

    return bookToRemove;
  }
}
