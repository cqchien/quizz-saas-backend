"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionStatus = exports.HeuristicLevel = exports.QuestionType = void 0;
var QuestionType;
(function (QuestionType) {
    QuestionType[QuestionType["MCQ"] = 1] = "MCQ";
    QuestionType[QuestionType["FITB"] = 2] = "FITB";
    QuestionType[QuestionType["MATCHING"] = 3] = "MATCHING";
    QuestionType[QuestionType["ORDERING"] = 4] = "ORDERING";
})(QuestionType = exports.QuestionType || (exports.QuestionType = {}));
var HeuristicLevel;
(function (HeuristicLevel) {
    HeuristicLevel[HeuristicLevel["KNOWLEDGE"] = 1] = "KNOWLEDGE";
    HeuristicLevel[HeuristicLevel["COMPREHENSION"] = 2] = "COMPREHENSION";
    HeuristicLevel[HeuristicLevel["APPLICATION"] = 3] = "APPLICATION";
    HeuristicLevel[HeuristicLevel["ANALYSIS"] = 4] = "ANALYSIS";
    HeuristicLevel[HeuristicLevel["SYNTHESIS"] = 5] = "SYNTHESIS";
    HeuristicLevel[HeuristicLevel["EVALUATION"] = 6] = "EVALUATION";
})(HeuristicLevel = exports.HeuristicLevel || (exports.HeuristicLevel = {}));
var QuestionStatus;
(function (QuestionStatus) {
    QuestionStatus[QuestionStatus["PENDING"] = 1] = "PENDING";
    QuestionStatus[QuestionStatus["ACTIVE"] = 2] = "ACTIVE";
    QuestionStatus[QuestionStatus["DRAFT"] = 3] = "DRAFT";
})(QuestionStatus = exports.QuestionStatus || (exports.QuestionStatus = {}));
//# sourceMappingURL=enum.js.map