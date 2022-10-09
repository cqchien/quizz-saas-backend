import { Injectable } from '@nestjs/common';

import {
  ExamNotFoundException,
  ExamSaveFailedException,
} from '../../../exceptions/exam';
import type { UserEntity } from '../../user/domain/entity/user.entity';
import type { ExamEntity } from '../domain/entity/exam.entity';
import { ExamRepository } from '../infra/exam.repository';
import type { ExamDto } from '../interface/dto/exam.dto';

@Injectable()
export class ExamService {
  constructor(private examRepository: ExamRepository) {}

  async createExam(user: UserEntity, examDto: ExamDto): Promise<ExamEntity> {
    try {
      const examEntity: ExamEntity = {
        ...examDto,
        createdBy: user.id,
        updatedBy: user.id,
      };

      const exam = await this.examRepository.create(examEntity);

      return exam;
    } catch (error) {
      throw new ExamSaveFailedException(
        (error as Error).message || 'Create exam failed!',
      );
    }
  }

  public async findOne(
    user: UserEntity,
    options: Record<string, string>,
  ): Promise<ExamEntity> {
    const query = user.id ? { ...options, createdBy: user.id } : options;
    const exam = await this.examRepository.findByCondition(query);

    if (!exam) {
      throw new ExamNotFoundException(
        'Exam does not exist or user not allow to get the exam!!',
      );
    }

    return exam;
  }
}
