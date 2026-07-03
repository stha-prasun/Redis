import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { ICourseRepository } from '../interfaces/course-repository.interface';

@Injectable()
export class TypeOrmCourseRepository implements ICourseRepository {
  constructor(
    @InjectRepository(Course)
    private readonly repository: Repository<Course>,
  ) {}

  create(course: Course) {
    return this.repository.save(course);
  }

  findById(id: string) {
    return this.repository.findOne({
      where: { id },
    });
  }

  save(course: Course) {
    return this.repository.save(course);
  }
}
