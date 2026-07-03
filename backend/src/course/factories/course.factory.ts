import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from '../dto/create-course.dto';
import { Course } from '../entities/course.entity';

@Injectable()
export class CourseFactory {
  create(dto: CreateCourseDto): Course {
    const course = new Course();

    course.title = dto.title;
    course.price = dto.price;

    return course;
  }
}
