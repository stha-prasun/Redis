import { Course } from '../entities/course.entity';

export interface ICourseRepository {
  create(course: Course): Promise<Course>;

  findById(id: string): Promise<Course | null>;

  save(book: Course): Promise<Course>;

  findAll(): Promise<Course[] | null>;
}
