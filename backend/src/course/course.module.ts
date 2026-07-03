import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { RedisModule } from 'src/redis/redis.module';
import { CourseFactory } from './factories/course.factory';
import { TypeOrmCourseRepository } from './repositories/typeorm-course.repository';
import { COURSE_REPOSITORY } from './constants/course.constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), RedisModule],
  controllers: [CourseController],
  providers: [
    CourseService,
    CourseFactory,
    TypeOrmCourseRepository,
    {
      provide: COURSE_REPOSITORY,
      useExisting: TypeOrmCourseRepository,
    },
  ],
})
export class CourseModule {}
