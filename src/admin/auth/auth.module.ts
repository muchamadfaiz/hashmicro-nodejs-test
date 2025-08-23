import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashingProvider } from './provider/hash/hashing.provider';
import { ArgonProvider } from './provider/hash/argon.provider';
import { TokenProvider } from './provider/token/token.provider';
import { CryptoTokenProvider } from './provider/token/cypto-token.provider';
import { JwtProvider } from './provider/jwt/jwt.provider';
import { NestJwtProvider } from './provider/jwt/nest-jwt.provider';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: HashingProvider,
      useClass: ArgonProvider,
    },
    {
      provide: TokenProvider,
      useClass: CryptoTokenProvider,
    },
    {
      provide: JwtProvider,
      useClass: NestJwtProvider,
    },
  ],
  exports: [HashingProvider],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION'),
        },
      }),
    }),
    UserModule,

    // forwardRef(() => UserModule),
  ],
})
export class AuthModule {}
