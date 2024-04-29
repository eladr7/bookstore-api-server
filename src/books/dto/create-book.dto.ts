import { IsEnum, MinLength } from 'class-validator';

export enum Genre {
  ScienceFiction = 'sciencefiction',
  Satire = 'satire',
  Drama = 'drama',
  Action = 'action',
  Romance = 'romance',
  Mystery = 'mystery',
  Horror = 'horror',
}

export class CreateBookDto {
  @MinLength(3)
  name: string;

  @IsEnum(Genre, {
    message: 'genre must be one of the allowed genres!',
  })
  genre: Genre;
}
