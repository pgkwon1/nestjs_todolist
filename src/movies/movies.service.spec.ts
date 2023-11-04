import { Test } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movies.entity';

describe('movie service test', () => {
  let service: MoviesService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();
    service = module.get<MoviesService>(MoviesService);
  });

  it('it should defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOne method test', () => {
    it("should return movie's subject", () => {
      const result = service.getOne('Avengers');

      expect(result).toEqual('here movie: Avengers');
    });
  });

  describe('getAll method test', () => {
    it('should be return array', () => {
      service.create({
        id: '1',
        subject: 'Avengers',
        genres: ['SF', 'Adventure', 'Hero'],
        year: 2012,
      });
      const result: Movie[] = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
});
