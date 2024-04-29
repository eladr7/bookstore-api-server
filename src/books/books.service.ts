import { Injectable } from '@nestjs/common';
import { CreateBookDto, Genre } from './dto/create-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  private books: Book[] = [
    {
      id: '1',
      title: 'cunt1',
      description: 'cunty book1',
      authorName: 'mega cunt1',
      publicationDate: new Date().toDateString(),
      price: 2,
      genre: Genre.Satire,
    },
    {
      id: '2',
      title: 'cunt2',
      description: 'cunty book2',
      authorName: 'mega cunt2',
      publicationDate: new Date().toDateString(),
      price: 4,
      genre: Genre.Satire,
    },
  ];
  create(createBookDto: CreateBookDto) {
    const newBook: Book = {
      ...createBookDto,
      id: Math.random().toString(),
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
