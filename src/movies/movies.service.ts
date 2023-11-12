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

  create(movieData: Movie) {
    this.movies.push({
      ...movieData,
    });
  }

  deleteOne(id: string) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  update(id: string, movieData: UpdateMovies) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...movieData });
  }
}
