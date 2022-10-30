export class QuestionOption {
  order: number;

  option: string;

  value?: string | boolean;
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

  mode: string;

  createdBy?: string;

  updatedBy?: string;

  updatedAt?: Date;

  createdAt?: Date;
}
