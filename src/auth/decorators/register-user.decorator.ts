import {
  ApiOperation,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import {
  conflictResponse,
  userObject,
  validationErrorResponse,
} from './swagger-objects';

export const ApiRegisterUserDocs =
  () => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiOperation({ summary: 'Authenticate User using Google credentials' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiCreatedResponse({
      description: 'User created successfully',
      schema: {
        properties: userObject,
      },
    })(target, propertyKey, descriptor);
    ApiBadRequestResponse({
      description: 'error on input validation fault',
      schema: {
        properties: validationErrorResponse,
      },
    })(target, propertyKey, descriptor);
    ApiConflictResponse({
      description: 'email is already exist',
      schema: {
        properties: conflictResponse,
      },
    })(target, propertyKey, descriptor);
  };
