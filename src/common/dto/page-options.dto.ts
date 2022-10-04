import { NumberFieldOptional, StringFieldOptional } from '../../decorators';

export class PageOptionsDto {
  @NumberFieldOptional({
    minimum: 1,
    default: 20,
    int: true,
  })
  readonly page: number = 1;

  @NumberFieldOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
    int: true,
  })
  readonly take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @StringFieldOptional()
  question: string;

  @StringFieldOptional()
  tags: string;

  @StringFieldOptional()
  topic: string;
}
