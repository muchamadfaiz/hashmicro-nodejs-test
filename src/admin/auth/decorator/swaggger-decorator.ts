import {
  applyDecorators,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

export function RegisterDecorators() {
  return applyDecorators(
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Register user' }),
    ApiCreatedResponse({
      description: 'Please check your email to verify your account.',
    }),
  );
}

export function LoginDecorators() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Login user' }),
    ApiOkResponse({ description: 'Success login' }),
  );
}

export function MeDecorators() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard),
    ApiOperation({ summary: 'Check user' }),
    ApiOkResponse({ description: 'Success get your credential' }),
  );
}

export function VerifyEmailDecorators() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Verify email' }),
    ApiOkResponse({ description: 'Email verified successfully.' }),
  );
}

export function ForgotPasswordDecorators() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Forgot password' }),
    ApiOkResponse({
      description: 'Please check your email to reset your password.',
    }),
  );
}

export function ResetPasswordDecorators() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Reset password' }),
    ApiOkResponse({ description: 'Password reset successfully.' }),
  );
}
