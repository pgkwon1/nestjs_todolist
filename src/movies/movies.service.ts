import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movies.entity';
import { UpdateMovies } from './entities/updateMovies.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const findMovie = this.movies.find((movie) => movie.id === id);
    if (!findMovie) {
      throw new NotFoundException(`movie ${id} is not found`);
    }

    return findMovie;
  }

  getMovieByTitle(subject: string): string {
    return `here movie by title = ${subject}`;
  }

  create(movieData: Movie) {
    console.log(typeof this.movies);
    this.movies.push({
      ...movieData,
    });
  }

  update(movieData: UpdateMovies) {}
}
