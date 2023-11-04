import { IsNumber, IsOptional, IsString } from 'class-validator';

export class Movie {
  @IsString()
  readonly id: string;

  @IsString()
  readonly subject: string;

  @IsNumber()
  readonly year: number;

  @IsString({ each: true })
  readonly genres: string[];
}
