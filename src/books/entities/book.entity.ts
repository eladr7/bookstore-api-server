import { Genre } from '../dto/create-book.dto';

export class Book {
  id: string;
  name: string;

  genre: Genre;
}
