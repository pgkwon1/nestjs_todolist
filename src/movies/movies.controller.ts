import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movies.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}
  @Get('/getMovie')
  getMovie(id: string): Movie {
    return this.movieService.getOne(id);
  }

  @Get('/AllMovie')
  getAllMovie(): Movie[] {
    return this.movieService.getAll();
  }

  @Post('/create')
  create(@Body() movieData: Movie): boolean {
    if (!movieData.id) {
      throw new NotFoundException('not without movie id');
    }
    this.movieService.create(movieData);
    return true;
  }

  @Patch('/update/:id')
  updateMovie(@Body('id') id: string, @Body('title') subject: string) {
    return this.movieService.update(id, {
      subject,
    });
  }

  /*
  @Patch('/update/:id')
  update(@Body() updateData, @Param('id') movieId: string) {
    return {
      movieId,
      ...updateData,
    };
  }
  */
}
