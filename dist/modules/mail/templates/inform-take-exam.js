"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.informTakeExam = void 0;
exports.informTakeExam = {
    body: `
    <p>Hi {{name}},</p>
    <p>Your exam is scheduled. Please join take the exam on time </p>
    <p>Exam Name: {{examName}}</p>
    <p>Description: {{description}}</p>
    <p>Number of questions: {{numOfQuestion}}</p>
    <p>Start time: {{startTime}}</p>
    <p>End time: {{endTime}}</p>
    <p>
      <a href="{{magicLink}}">Go to Exam</a>
    </p>
    <p>Regards</p>
    <p>Knowled</p>
  `,
    title: 'Your exam is scheduled.',
};
//# sourceMappingURL=inform-take-exam.js.map