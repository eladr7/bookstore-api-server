import { Injectable } from '@nestjs/common';
import { Genre, PrismaClient } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  prisma = new PrismaClient();

  async create(createBookDto: CreateBookDto) {
    const { title, description, authorName, publicationDate, genre } =
      createBookDto;
    const price = parseFloat(String(createBookDto.price));

    const newBook = await this.prisma.book.create({
      data: {
        title,
        description,
        author: {
          create: {
            authorName,
          },
        },
        publicationDate,
        price,
        genre,
      },
      include: {
        author: true,
      },
    });

    if (!newBook) {
      throw new Error('Book creation failed!');
    }

    return this.mapToBook(newBook);
  }

  async findAll(genre: Genre): Promise<Book[]> {
    const books = await this.prisma.book.findMany({
      where: {
        genre,
      },
      include: {
        author: true,
      },
    });

    return books.map(this.mapToBook); // Map all books to Book class
  }

  async findOne(genre: Genre, id: string): Promise<Book | null> {
    const book = await this.prisma.book.findUnique({
      where: {
        id,
        genre,
      },
      include: {
        author: true,
      },
    });

    return book ? this.mapToBook(book) : null; // Map the found book to Book class if not null
  }

  async remove(genre: Genre, id: string): Promise<Book | null> {
    const deletedBook = await this.prisma.book.delete({
      where: {
        id,
        genre,
      },
      include: {
        author: true,
      },
    });

    return deletedBook ? this.mapToBook(deletedBook) : null; // Map the deleted book to Book class if not null
  }

  private mapToBook(prismaBook: any): Book {
    return {
      id: prismaBook.id,
      title: prismaBook.title,
      description: prismaBook.description,
      authorName: prismaBook.author.authorName,
      publicationDate: prismaBook.publicationDate.toISOString(),
      price: prismaBook.price,
      genre: prismaBook.genre,
    };
  }
}
