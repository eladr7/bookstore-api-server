import { Injectable } from '@nestjs/common';
import { Genre, PrismaClient } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  prisma = new PrismaClient();

  async create(createBookDto: CreateBookDto) {
    const { title, description, authorName, genre } = createBookDto;
    const price = parseFloat(String(createBookDto.price));
    const publicationDate = createBookDto.publicationDate + 'T00:00:00.000Z'; // Append time component

    try {
      const newBook = await this.prisma.book.create({
        data: {
          title,
          description,
          author: {
            connectOrCreate: {
              where: { authorName }, // Specify the condition for connect or create
              create: { authorName }, // Specify the fields to create if author doesn't exist
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

      return this.mapToBook(newBook);
    } catch (error) {
      throw new Error('Book creation failed: ' + error.message);
    }
  }

  async findAllByGenre(genre: Genre): Promise<Book[]> {
    try {
      const books = await this.prisma.book.findMany({
        where: {
          genre,
        },
        include: {
          author: true,
        },
      });

      return books.map(this.mapToBook);
    } catch (error) {
      throw new Error('Books not found');
    }
  }

  async findAll(): Promise<Book[]> {
    try {
      const books = await this.prisma.book.findMany({
        include: {
          author: true,
        },
      });

      return books.map(this.mapToBook);
    } catch (error) {
      throw new Error('Books not found');
    }
  }

  async findOne(genre: Genre, id: string): Promise<Book | null> {
    try {
      const book = await this.prisma.book.findUnique({
        where: {
          id,
          genre,
        },
        include: {
          author: true,
        },
      });

      return book ? this.mapToBook(book) : null;
    } catch (error) {
      throw new Error('Book not found');
    }
  }

  async remove(genre: Genre, id: string): Promise<Book | null> {
    try {
      const deletedBook = await this.prisma.book.delete({
        where: {
          id,
          genre,
        },
        include: {
          author: true,
        },
      });

      return deletedBook ? this.mapToBook(deletedBook) : null;
    } catch (error) {
      throw new Error('Failed to delete');
    }
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
