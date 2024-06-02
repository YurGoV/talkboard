export const createUserSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', example: 'example@example.com' },
    userName: { type: 'string', example: 'John Doe' },
    avatar: {
      type: 'string',
      format: 'binary',
      description: 'avatar image',
    },
    homePage: { type: 'string', example: 'https://home.page.com' },
    password: { type: 'string', example: 'diel8*I2j' },
  },
};
