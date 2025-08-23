export const TIME_CONSTANTS = {
  ONE_HOUR: 1000 * 60 * 60,
  ONE_DAY: 1000 * 60 * 60 * 24,
};

export const TIME_UTILS = {
  oneHourAfterNow: () => new Date(Date.now() + TIME_CONSTANTS.ONE_HOUR),
};

export const AUTH_MESSAGES = {
  REGISTER_SUCCESS: 'Please check your email to verify your account.',
  LOGIN_SUCCESS: 'User has been logged in',
  ME_SUCCESS: 'Success get your credential',
  EMAIL_VERIFIED: 'Email verified successfully.',
  FORGOT_PASSWORD: 'Please check your email to reset your password.',
  RESET_PASSWORD: 'Your password has been successfully reset.',
};

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid credentials',
  TOKEN_EXPIRED: 'Invalid or expired token',
  USER_NOT_FOUND: 'User not found',
  USERNAME_EXISTS: 'Username already exists',
  EMAIL_EXISTS: 'Email already exists',
  INVALID_OR_EXPIRED_TOKEN: 'Invalid or expired token',
};

export const STATUS = {
  SUCCESS: true,
  FAIL: false,
};
