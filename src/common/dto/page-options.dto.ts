import { NumberFieldOptional } from '../../decorators';

export class PageOptionsDto {
  @NumberFieldOptional({
    minimum: 1,
    default: 1,
    example: 1,
    int: true,
  })
  readonly page: number = 1;

  @NumberFieldOptional({
    minimum: 10,
    maximum: 50,
    default: 10,
    example: '10',
    int: true,
  })
  readonly take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
