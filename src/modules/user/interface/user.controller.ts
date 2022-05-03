import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from '../app/user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}
}
