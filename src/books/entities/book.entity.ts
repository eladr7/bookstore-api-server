import { Genre } from '@prisma/client';

export class Book {
  id: string;
  title: string;
  description: string;
  authorName: string;
  publicationDate: string;
  price: number;
  genre: Genre;
}
