import { Test } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movies.entity';
import { NotFoundException } from '@nestjs/common';

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
      service.create({
        id: '1',
        subject: 'Avengers',
        genres: ['SF', 'Adventure', 'Hero'],
        year: 2012,
      });
      const result = service.getOne('1');

      expect(result).toBeInstanceOf(Object);
      expect(result.id).toEqual('1');
    });
  });

  describe('getAll method test', () => {
    beforeEach(() => {
      service.create({
        id: '1',
        subject: 'Avengers',
        genres: ['SF', 'Adventure', 'Hero'],
        year: 2012,
      });
      service.create({
        id: '2',
        subject: 'Avengers2',
        genres: ['SF', 'Adventure', 'Hero'],
        year: 2015,
      });
      service.create({
        id: '3',
        subject: 'Avengers',
        genres: ['SF', 'Adventure', 'Hero'],
        year: 2018,
      });
    });
    it('should be return array', () => {
      const result: Movie[] = service.getAll();
      expect(result[0].subject).toBe('Avengers');
    });
  });

  describe('exception test', () => {
    beforeEach(() => {
      service.create({
        id: '1',
        subject: 'Avengers',
        genres: ['SF', 'Adventure', 'Hero'],
        year: 2012,
      });
      service.create({
        id: '2',
        subject: 'Avengers2',
        genres: ['SF', 'Adventure', 'Hero'],
        year: 2015,
      });
    });

    it('should throw 404 exception', async () => {
      try {
        service.getOne('123');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw 404 exception v2', () => {
      try {
        service.getOne('123');
      } catch (e) {
        expect(e.message).toEqual('movie 123 is not found');
      }
    });
  });

  describe('delete one method', () => {
    it('delete a movie', () => {
      service.create({
        id: '1',
        subject: 'wow movie',
        genres: ['SF'],
        year: 2012,
      });
      service.create({
        id: '2',
        subject: 'wow movie2',
        genres: ['SF'],
        year: 2013,
      });
      const beforeDelete = service.getAll();
      service.deleteOne('2');
      const afterDelete = service.getAll();
      expect(afterDelete.length).toEqual(beforeDelete.length - 1);
    });

    it('should return 404', () => {
      try {
        service.deleteOne('123');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create method', () => {
    it('create movie', () => {
      const beforeCreate = service.getAll().length;

      service.create({
        id: '1',
        subject: 'wow movie',
        genres: ['SF'],
        year: 2012,
      });

      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update method', () => {
    it('update movie', () => {
      service.create({
        id: '1',
        subject: 'wow movie',
        genres: ['SF'],
        year: 2012,
      });

      service.update('1', { subject: 'wow movie2', year: 2013 });
      const afterUpdate = service.getOne('1');
      expect(afterUpdate.subject).toEqual('wow movie2');
      expect(afterUpdate.year).toEqual(2013);
    });
  });
});
