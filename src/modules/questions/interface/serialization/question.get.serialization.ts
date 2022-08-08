import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ApiEnumProperty } from "../../../../decorators";
import { QuestionEntity } from "modules/questions/domain/entity/question.entity";
import {
  HeuristicLevel,
  QuestionStatus,
  QuestionType,
} from "../../constant/enum";

export class QuestionGetSerialization {
  @ApiProperty()
  id?: string;

  @ApiPropertyOptional()
  question: string;

  @ApiEnumProperty(() => QuestionType)
  type: string;

  @ApiEnumProperty(() => HeuristicLevel)
  heuristicLevel: string;

  @ApiEnumProperty(() => QuestionStatus)
  status: string;

  @ApiPropertyOptional()
  level?: number;

  @ApiPropertyOptional()
  topic?: string;

  @ApiPropertyOptional()
  tags: string[];

  @ApiPropertyOptional()
  language: string;

  @ApiPropertyOptional()
  attachment?: string[];

  @ApiPropertyOptional()
  isPrivate: boolean;

  @ApiPropertyOptional()
  updatedAt?: Date;

  @ApiPropertyOptional()
  createdAt?: Date;

  constructor(entity: QuestionEntity) {
    this.id = entity.id;
    this.question = entity.question;
    this.type = entity.type;
    this.heuristicLevel = entity.heuristicLevel;
    this.status = entity.status;
    this.level = entity.level;
    this.topic = entity.topic;
    this.tags = entity.tags;
    this.language = entity.language;
    this.attachment = entity.attachment;
    this.isPrivate = entity.isPrivate;
    this.updatedAt = entity.updatedAt;
    this.createdAt = entity.createdAt;
  }
}
