export enum QuestionType {
  // Multiple Choice Question
  MCQ = 'multiple_choice_question',
  // Fill In The Blank
  FITB = 'fill_in_the_blank',
  // Matching
  MATCHING = 'matching',
  // Ordering
  ORDERING = 'ordering',
}

export enum HeuristicLevel {
  KNOWLEDGE = 'knowledge',
  COMPREHENSION = 'comprehension',
  APPLICATION = 'application',
  ANALYSIS = 'analysis',
  SYNTHESIS = 'synthesis',
  EVALUATION = 'evaluation',
}

export enum QuestionStatus {
  PENDING = 'Pending',
  ACTIVE = 'Active',
  DRAFT = 'Draft',
}
