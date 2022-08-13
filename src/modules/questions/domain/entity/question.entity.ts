class QuestionOption {
  order: number;

  option: string;

  value: string;
}

export class QuestionEntity {
  id?: string;

  question: string;

  type: string;

  heuristicLevel: string;

  status: string;

  level?: number;

  topic?: string;

  tags: string[];

  options: QuestionOption[];

  language: string;

  attachments?: string[];

  isPrivate: boolean;

  createdBy?: string;

  updatedBy?: string;

  updatedAt?: Date;

  createdAt?: Date;
}
