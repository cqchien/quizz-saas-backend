"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANSWER_START_WITH = exports.COLUMN_IMPORT_QUESTIONS = exports.LANG = exports.MAP_MODE = exports.MODE = exports.MAP_QUESTION_STATUS = exports.QUESTION_STATUS = exports.MAP_HEURISTIC_LEVEL = exports.HEURISTIC_LEVEL = exports.MAP_QUESTION_TYPE = exports.QUESTION_TYPE = void 0;
exports.QUESTION_TYPE = {
    MULTIPLE_CHOICE: 'multiple_choice_question',
    SINGLE_CHOICE: 'single_choice_question',
    FILL_IN_THE_BLANK: 'fill_in_the_blank',
    MATCHING: 'matching',
    ORDERING: 'ordering',
};
exports.MAP_QUESTION_TYPE = {
    [exports.QUESTION_TYPE.MULTIPLE_CHOICE]: 'Multiple Choice Question',
    [exports.QUESTION_TYPE.SINGLE_CHOICE]: 'Single Choice Question',
    [exports.QUESTION_TYPE.FILL_IN_THE_BLANK]: 'Fill In The Blank',
    [exports.QUESTION_TYPE.MATCHING]: 'Matching',
    [exports.QUESTION_TYPE.ORDERING]: 'Ordering',
};
exports.HEURISTIC_LEVEL = {
    KNOWLEDGE: 'knowledge',
    COMPREHENSION: 'comprehension',
    APPLICATION: 'application',
    ANALYSIS: 'analysis',
    SYNTHESIS: 'synthesis',
    EVALUATION: 'evaluation',
};
exports.MAP_HEURISTIC_LEVEL = {
    [exports.HEURISTIC_LEVEL.KNOWLEDGE]: 'Knowledge',
    [exports.HEURISTIC_LEVEL.COMPREHENSION]: 'Comprehension',
    [exports.HEURISTIC_LEVEL.APPLICATION]: 'Application',
    [exports.HEURISTIC_LEVEL.ANALYSIS]: 'Analysis',
    [exports.HEURISTIC_LEVEL.SYNTHESIS]: 'Synthesis',
    [exports.HEURISTIC_LEVEL.EVALUATION]: 'Evaluation',
};
exports.QUESTION_STATUS = {
    PENDING: 'pending',
    ACTIVE: 'active',
    DRAFT: 'draft',
};
exports.MAP_QUESTION_STATUS = {
    [exports.QUESTION_STATUS.PENDING]: 'Pending',
    [exports.QUESTION_STATUS.ACTIVE]: 'Active',
    [exports.QUESTION_STATUS.DRAFT]: 'Draft',
};
exports.MODE = {
    PUBLIC: 'public',
    PRIVATE: 'private',
};
exports.MAP_MODE = {
    [exports.MODE.PRIVATE]: 'Private',
    [exports.MODE.PUBLIC]: 'Public',
};
exports.LANG = {
    VIET: 'vi',
};
exports.COLUMN_IMPORT_QUESTIONS = {
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
exports.ANSWER_START_WITH = 'Đáp án';
//# sourceMappingURL=index.js.map