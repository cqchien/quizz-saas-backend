import type { UserExamEntity } from './user-exam.entity';

export class UserEntity {
  id?: string;

  name: string;

  role: string;

  email: string;

  password: string;

  exams?: UserExamEntity[];

  phone?: string;

  avatar?: string;

  updatedAt?: Date;

  createdAt?: Date;
}
