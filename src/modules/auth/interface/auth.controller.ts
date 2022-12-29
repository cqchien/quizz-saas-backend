import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { sign } from 'jsonwebtoken';

import { UserNotFoundException } from '../../../exceptions';
import { UserService } from '../../user/app/user.service';
import { UserPresenter } from '../../user/interface/presenter/user.presenter';
import { AuthService } from '../app/auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserLoginDto } from './dto/login.dto';
import { UserRegisterDto } from './dto/register.dto';
import { LoginPresenter } from './presenter/login.presenter';
import { AuthResponsePresenter } from './presenter/response.presenter';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('jwt')
  getToken(@Res() res: Response) {
    const privateKey = `
    -----BEGIN RSA PRIVATE KEY-----
    MIIEpAIBAAKCAQEAh0jHFwkkWXZ45jCuE+hCRUWVrL2/VXhqGGa8BmbqPo18d1lo
    rUfDuYkjQZvQaO4HfCURmpwhzPrgErUt7ztuv3dRbDsHRIlIbSgDWdE2AsDrjhsN
    bpSiXZPsuDL4wuKYwY4U478p9ugtuqai8bNOEomLz41qcVil1nTa6yxCyzPTsOlg
    rYFD2C/VWcjHin+895WD5aekGxYq+u1XowSien/XhVNHjW6ZbickMKx0994gIK3+
    ulhCuU+kGd7MR0DL8qFrLmQtT2ttOPolP5uxy9fFSSVxCNQrTLApjIRH4nAOzgLv
    wh5dOEBw3FBbVvQGczgb5ajDw4X4z/TV1XqLYQIDAQABAoIBAAMLwWBIVlk9jq+r
    nErCU6YmwL3FvKpoanabzwtTmz3u7nTLNn0yyMJLVzfvobnQFKrv1HlzPxtT8XI4
    YjUxBM+CqKqXumRZlS/wewFVYZp+pJsTqrnw9qYl2cpEqwdLxenTOK8PR3sJu5hY
    jsIDggwurL8+wU0VpG+7fC+X9LXJn76/8tAZPxG88zmvKCYwokimBjaZwC2b8F99
    CE6c9QwCjXIFBdc3j0gmYx/Zc5tNRoyVm0acHCF/nrTHfhOLS0+R2tm2xMMKuEl+
    vKnPkpUSreJElW+ohI2F8XCyUUOsYUsSmbe5fklFTa5pEmOoJBYnnKNuYmRLF/Mg
    Nhvy5AECgYEAvG+LM9AZ0tqcN/SQPMYHtK5qRSssRgej7Px8jbO583X5wsjaHz94
    shvQo0ppid8Fsgnwg9v3ccjD1ybA+dxgD+rhi8Nn8vEcyOrgwGFE8wlE+/aaXwtr
    4erKlwTxh9AW1cN/cg5l8B8PbjyE6Lh+JltgqxJbmXwkUli83OAQxWECgYEAt8p7
    Ckb/NTmO+vBqVLqutX3NnX/FhR1TbbTPI7bAjisIZ18bYEePACuyDKlPCbfOqhOi
    NikN5h6Y+OS5uEHN3BiMsfu5FFof9V1wNfDwBfFhyv2aLthoN63SibCSDWAUuHKN
    VGtZFv04yEsbmpHKSrJeLCAfVuabeplTUmu5hgECgYAG2U8H7RJjNYrkBcGQU+pH
    yOcX6H/Nc82jeXHVfKjPjoQrbj1vUVFDt/sXVEcNucttMytIv5/4xMFJeqEc88OS
    EIluGQYYMGdJbjAJDgABjV6ygb4Ook2jgnMmlglpVEjgMCDbtmZCGf7nlM+H3dzH
    7B5RWXN22qo/S/ZhWMuDQQKBgQCwCiSiKnDGVVRrbZ4bfBhdxJsOsdTKdNV1bks9
    xQ1Y30UUZld9d+0z16aaVA1dnI45/8ZOpDIo6cPSGpr9LyJ0H5ub2yViphSYW6Bg
    OmBdAOCPoytslWH1euv/cH3ki9Qs+6P9aTkTOQaLas2M1vnxZDmpgDckcIwZ+QSD
    HKW+AQKBgQCePhbvYAcuQ8xAHo5XZ9PRanTzD9OLO3Kl6Z8J1GasCQtRrLVLJghe
    iJCFr6/gVKWx5/Wjeau3k22LMXrLNAYML8q4on1BnWx8C2uJK62Tu9Zh4cTK4xjZ
    uJkr2sINb10vlE57J9/RZFSkPae5QqpHSGskTWnhdqgqQmmhZNGuQg==
    -----END RSA PRIVATE KEY-----
    `;

    const payload = {
      sub: '123', // Unique user id string
      name: 'chien.cq', // Full name of user
      exp: Math.floor(Date.now() / 1000) + 60 * 1_000_000, // 10 minutes expiration
    };
    const token = sign(payload, privateKey, { algorithm: 'HS256' });

    res.set('content-type', 'application/json');
    res.status(200);
    res.send(
      JSON.stringify({
        token,
      }),
    );
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: AuthResponsePresenter,
    description: 'User info with access token',
  })
  @ApiException(() => [UserNotFoundException])
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<AuthResponsePresenter> {
    const user = await this.authService.validateUser(userLoginDto);

    const token = await this.authService.createAccessToken({
      userId: user.id,
      role: user.role,
    });

    const userPresenter = new UserPresenter(user);
    const loginPresenter = new LoginPresenter(userPresenter, token);

    return new AuthResponsePresenter(loginPresenter);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: AuthResponsePresenter,
    description: 'Successfully Registered',
  })
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<AuthResponsePresenter> {
    const user = await this.userService.createUser(userRegisterDto);
    const userPresenter = new UserPresenter(user);

    return new AuthResponsePresenter(userPresenter);
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: AuthResponsePresenter,
    description: 'Successfully Change Password',
  })
  async userChangePassword(
    @Query('token') token: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<AuthResponsePresenter> {
    const user = await this.authService.verifyAccessToken(token);

    const updatedUser = await this.userService.changePassword(
      user.id || '',
      changePasswordDto,
    );
    const userPresenter = new UserPresenter(updatedUser);

    return new AuthResponsePresenter(userPresenter);
  }
}
