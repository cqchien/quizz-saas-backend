import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { UserModule } from '../user/user.module';
import { AuthService } from './app/auth.service';
import { JwtStrategy } from './app/jwt.strategy';
import { PublicStrategy } from './app/public.strategy';
import { AuthController } from './interface/auth.controller';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ApiConfigService) => ({
        secretOrPrivateKey: configService.authConfig.publicKey,
        // if you want to use token with expiration date
        signOptions: {
          expiresIn: configService.getNumber('JWT_EXPIRATION_TIME'),
        },
      }),
      inject: [ApiConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PublicStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
