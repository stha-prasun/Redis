import { Inject, Injectable } from '@nestjs/common';
import { CourseFactory } from './factories/course.factory';
import { COURSE_REPOSITORY } from './constants/course.constants';
import type { ICourseRepository } from './interfaces/course-repository.interface';
import { CreateCourseDto } from './dto/create-course.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class CourseService {
  constructor(
    private readonly bookFactory: CourseFactory,
    private readonly redisService: RedisService,

    @Inject(COURSE_REPOSITORY)
    private readonly repository: ICourseRepository,
  ) {}

  create(dto: CreateCourseDto) {
    const book = this.bookFactory.create(dto);

    return this.repository.create(book);
  }

  async findOne(id: string) {
    const cacheKey = `course:${id}`;

    const cached = await this.redisService.get(cacheKey);

    if (cached) {
      console.log('Cache Hit');

      return JSON.parse(cached);
    }

    console.log('Cache Miss');

    const course = await this.repository.findById(id);

    if (!course) {
      return null;
    }

    await this.redisService.set(cacheKey, JSON.stringify(course), 300);

    return course;
  }

  async findAll() {
    const cacheKey = 'courses:all';

    const cached = await this.redisService.get(cacheKey);

    const coursesFromDb = await this.repository.findAll();

    if (!cached) {
      await this.redisService.set(cacheKey, JSON.stringify(coursesFromDb), 300);

      return coursesFromDb;
    }

    const cachedCourses = JSON.parse(cached);

    if (JSON.stringify(cachedCourses) !== JSON.stringify(coursesFromDb)) {
      console.log('Cache outdated');

      await this.redisService.set(cacheKey, JSON.stringify(coursesFromDb), 300);

      return coursesFromDb;
    }

    console.log('Cache up to date');

    return cachedCourses;
  }
}
