import {
  ApiOperation,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { userObject } from './swagger-objects';

export const ApiCurrentDocs =
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
    ApiForbiddenResponse({
      description: 'Forbidden on uncorrect token',
    })(target, propertyKey, descriptor);
    ApiBadRequestResponse({
      description: 'on request without token, etc..',
    })(target, propertyKey, descriptor);
  };
