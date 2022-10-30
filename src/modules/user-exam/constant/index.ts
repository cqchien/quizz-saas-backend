export const USER_EXAM_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in-progress',
  SUBMITTED: 'submitted',
};

export const RESULT_EXAM_STATUS = {
  PASS: 'passed',
  FAILED: 'failed',
  NOT_SET: 'not_set',
};

export const MAP_RESULT_EXAM_STATUS = {
  [RESULT_EXAM_STATUS.PASS]: 'Passed',
  [RESULT_EXAM_STATUS.FAILED]: 'Failed',
  [RESULT_EXAM_STATUS.NOT_SET]: 'Not Set',
};
