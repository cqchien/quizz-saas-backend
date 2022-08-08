export class QuestionEntity {
  id?: string;

  question: string;

  type: string;

  heuristicLevel: string;

  status: string;

  level?: number;

  topic?: string;

  tags: string[];

  language: string;

  attachment?: string[];

  isPrivate: boolean;

  createdBy?: string;

  updatedBy?: string;

  updatedAt?: Date;

  createdAt?: Date;
}
