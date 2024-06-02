import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => {
  const secret = configService.get<string>('JWT_SECRET');
  const expiresIn = configService.get<string | number>('JWT_EXPIRES_IN');

  console.log('JWT_SECRET:', secret);
  console.log('JWT_EXPIRES_IN:', expiresIn);
  return {
    secret: configService.get('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get('JWT_EXPIRES_IN'),
    },
  };
};
