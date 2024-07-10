export const createUserSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', example: 'email@email.com' },
    userName: { type: 'string', example: 'John Doe' },
    avatar: {
      type: 'string',
      format: 'binary',
      description: 'avatar image',
    },
    homePage: { type: 'string', example: 'https://home.page.com' },
    password: { type: 'string', example: 'iDel8(3j3' },
  },
};
