import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from '../app/user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  // @Get()
  // @Auth([RoleType.USER])
  // @HttpCode(HttpStatus.OK)
  // @ApiPageOkResponse({
  //   description: 'Get users list',
  //   type: PageDto,
  // })
  // getUsers(
  //   @Query(new ValidationPipe({ transform: true }))
  //   pageOptionsDto: UsersPageOptionsDto,
  // ): Promise<PageDto<UserDto>> {
  //   return this.userService.getUsers(pageOptionsDto);
  // }

  // @Get(':id')
  // @Auth([RoleType.USER])
  // @HttpCode(HttpStatus.OK)
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Get users detail',
  //   type: UserDto,
  // })
  // getUser(@Param('id') id: string): Promise<UserDto> {
  //   return this.userService.getUser(id);
  // }
}
