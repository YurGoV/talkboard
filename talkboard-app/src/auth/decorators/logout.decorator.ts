import {
  ApiOperation,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiLogoutDocs =
  () => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiOperation({ summary: 'logout user credentials' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiNoContentResponse({
      description: 'User logged our successfully',
    })(target, propertyKey, descriptor);
    ApiForbiddenResponse({
      description: 'Forbidden on uncorrect token',
    })(target, propertyKey, descriptor);
    ApiBadRequestResponse({
      description: 'on request without token, etc..',
    })(target, propertyKey, descriptor);
    ApiUnauthorizedResponse({
      description: 'user already logged out',
    })(target, propertyKey, descriptor);
  };
