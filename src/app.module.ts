import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [BooksModule, GenresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
