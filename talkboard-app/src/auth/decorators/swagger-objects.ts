import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const userObject = {
  userName: { type: 'string', example: 'John Doy' },
  email: { type: 'string', example: 'example@example.com' },
  photo: {
    type: 'string',
    example:
      'https://res.cloudinary.com/dpt5zgoh5/image/upload/v1716810918/d0ksum8zrecwlvcowwjx.jpg',
  },
  homePage: {
    type: 'string',
    example:
      'https://res.cloudinary.com/dpt5zgoh5/image/upload/v1716810918/d0ksum8zrecwlvcowwjx.jpg',
  },
  avatarUrl: {
    type: 'string',
    example:
      'https://res.cloudinary.com/dpt5zgoh5/image/upload/v1716810918/d0ksum8zrecwlvcowwjx.jpg',
  },
  token: {
    type: 'string',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inl1cmdvdkBnbWFpbC5jb20iLCJpYXQiOjE3MTE5NTYxMTIsImV4cCI6MTcxNDk4MDExMn0.uOC6fGyr8h1bQllOfPl5bvqSWO_yb2S1mD--l0SVRsA',
  },
};

export const userNotFoundResponse = {
  message: { type: 'string', example: 'there no such user' },
  error: { type: 'strihg', example: 'Not Found' },
  statusCode: {
    type: 'number',
    example: 404,
  },
};

export const _validationErrorResponse: Record<string, SchemaObject> = {
  message: {
    type: 'array',
    items: {
      type: 'string',
    },
    example: ['password is not strong enough'],
  },
  error: {
    type: 'string',
    example: 'Bad Request',
  },
  statusCode: {
    type: 'number',
    example: 400,
  },
};
export const validationErrorResponse: Record<string, SchemaObject> = {
  message: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        field: {
          type: 'string',
          description: 'The name of the field where the error occurred',
        },
        error: {
          type: 'string',
          description: 'The error message describing the validation failure',
        },
      },
    },
    example: [
      {
        field: 'email',
        error: 'email must be an email',
      },
    ],
  },
  error: {
    type: 'string',
    example: 'Bad Request',
  },
  statusCode: {
    type: 'number',
    example: 400,
  },
};

export const forbiddenResponse: Record<string, SchemaObject> = {
  statusCode: {
    type: 'number',
    example: 403,
  },
  message: {
    type: 'string',
    example: 'forbidden to update noy your own post',
  },
};

export const conflictResponse: Record<string, SchemaObject> = {
  statusCode: {
    type: 'number',
    example: 409,
  },
  message: {
    type: 'string',
    example: 'email already exist',
  },
};

export const unauthorizedResponse: Record<string, SchemaObject> = {
  message: { type: 'string', example: 'authorization error' },
  error: { type: 'strihg', example: 'Unauthorized' },
  statusCode: {
    type: 'number',
    example: 401,
  },
};
