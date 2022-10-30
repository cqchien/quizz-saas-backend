export const QUESTION_TYPE = {
  MULTIPLE_CHOICE: 'multiple_choice_question',
  SINGLE_CHOICE: 'single_choice_question',
  FILL_IN_THE_BLANK: 'fill_in_the_blank',
  MATCHING: 'matching',
  ORDERING: 'ordering',
};

export const MAP_QUESTION_TYPE = {
  [QUESTION_TYPE.MULTIPLE_CHOICE]: 'Multiple Choice Question',
  [QUESTION_TYPE.SINGLE_CHOICE]: 'Single Choice Question',
  [QUESTION_TYPE.FILL_IN_THE_BLANK]: 'Fill In The Blank',
  [QUESTION_TYPE.MATCHING]: 'Matching',
  [QUESTION_TYPE.ORDERING]: 'Ordering',
};

export const HEURISTIC_LEVEL = {
  KNOWLEDGE: 'knowledge',
  COMPREHENSION: 'comprehension',
  APPLICATION: 'application',
  ANALYSIS: 'analysis',
  SYNTHESIS: 'synthesis',
  EVALUATION: 'evaluation',
};

export const MAP_HEURISTIC_LEVEL = {
  [HEURISTIC_LEVEL.KNOWLEDGE]: 'Knowledge',
  [HEURISTIC_LEVEL.COMPREHENSION]: 'Comprehension',
  [HEURISTIC_LEVEL.APPLICATION]: 'Application',
  [HEURISTIC_LEVEL.ANALYSIS]: 'Analysis',
  [HEURISTIC_LEVEL.SYNTHESIS]: 'Synthesis',
  [HEURISTIC_LEVEL.EVALUATION]: 'Evaluation',
};

export const QUESTION_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  DRAFT: 'draft',
};

export const MAP_QUESTION_STATUS = {
  [QUESTION_STATUS.PENDING]: 'Pending',
  [QUESTION_STATUS.ACTIVE]: 'Active',
  [QUESTION_STATUS.DRAFT]: 'Draft',
};

export const MODE = {
  PUBLIC: 'public',
  PRIVATE: 'private',
};

export const MAP_MODE = {
  [MODE.PRIVATE]: 'Private',
  [MODE.PUBLIC]: 'Public',
};

export const LANG = {
  VIET: 'vi',
};

export const COLUMN_IMPORT_QUESTIONS = {
  TYPE: 'Loại câu hỏi',
  QUESTION: 'Nội dung câu hỏi',
  CORRECT_ANSWER: 'Đáp án đúng',
  TOPIC: 'Chủ đề',
  TAGS: 'Thẻ',
  LEVEL: 'Mức độ (thang 10)',
  HEURISTIC_LEVEL: 'Mức độ vận dụng',
  LANG: 'Ngôn ngữ',
  STATUS: 'Trạng thái',
  MODE: 'Chế độ',
};

export const ANSWER_START_WITH = 'Đáp án';
