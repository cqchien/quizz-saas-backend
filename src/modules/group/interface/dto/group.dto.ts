import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class MemberGroupDto {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  email: string;
}

export class GroupDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: MemberGroupDto,
    isArray: true,
  })
  @IsOptional()
  members: MemberGroupDto[];
}
