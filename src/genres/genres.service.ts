import { Injectable } from '@nestjs/common';
import { Genre } from '@prisma/client';

@Injectable()
export class GenresService {
  findAll() {
    return Object.keys(Genre).map((k: string) => k);
  }
}
