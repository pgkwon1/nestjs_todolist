import { PartialType } from '@nestjs/mapped-types';
import { Movie } from './movies.entity';

export class UpdateMovies extends PartialType(Movie) {}
