import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movies.entity';
import { UpdateMovies } from './entities/updateMovies.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(subject: string): string {
    return `here: ${subject}`;
  }

  getMovieByTitle(subject: string): string {
    return `here movie by title = ${subject}`;
  }

  create(movieData: Movie) {
    this.movies.push({
      ...movieData,
    });
  }

  update(movieData: UpdateMovies) {}
}
