import { Injectable } from '@nestjs/common';
import { Genre, PrismaClient } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  prisma = new PrismaClient();

  async create(createBookDto: CreateBookDto) {
    const { title, description, authorName, publicationDate, price, genre } =
      createBookDto;
    return this.prisma.book.create({
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
    });
  }

  async findAll(genre: Genre) {
    return this.prisma.book.findMany({
      where: {
        genre,
      },
    });
  }

  async findOne(genre: Genre, id: string) {
    return this.prisma.book.findUnique({
      where: {
        id,
        genre,
      },
    });
  }

  async remove(genre: Genre, id: string) {
    return this.prisma.book.delete({
      where: {
        id,
        genre,
      },
    });
  }
}
