export enum QuestionType {
  // Multiple Choice Question
  MCQ = 1,
  // Fill In The Blank
  FITB = 2,
  // Matching
  MATCHING = 3,
  // Ordering
  ORDERING = 4,
}

export enum HeuristicLevel {
  KNOWLEDGE = 1,
  COMPREHENSION = 2,
  APPLICATION = 3,
  ANALYSIS = 4,
  SYNTHESIS = 5,
  EVALUATION = 6,
}

export enum QuestionStatus {
  PENDING = 'Pending',
  ACTIVE = 'Active',
  DRAFT = 'Draft',
}
