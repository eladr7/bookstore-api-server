import { Genre } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsPositive, MinLength } from 'class-validator';

export class CreateBookDto {
  @MinLength(3)
  title: string;

  @MinLength(10)
  description: string;

  @MinLength(5)
  authorName: string;

  @IsDateString()
  publicationDate: string;

  @Transform(({ value }) => parseFloat(value))
  @IsPositive()
  price: number;

  @IsEnum(Genre, {
    message: 'Genre must be one of the allowed genres!',
  })
  genre: Genre;
}
