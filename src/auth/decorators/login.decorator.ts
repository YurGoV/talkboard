import {
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { unauthorizedResponse, userObject } from './swagger-objects';

export const ApiLoginDocs =
  () => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiOperation({ summary: 'Authenticate User using Google credentials' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiOkResponse({
      description: 'User authenticated successfully',
      schema: {
        properties: userObject,
      },
    })(target, propertyKey, descriptor);
    ApiUnauthorizedResponse({
      description: 'wrong password, etc..',
      schema: {
        properties: unauthorizedResponse,
      },
    })(target, propertyKey, descriptor);
  };
