export const createCommentSchema = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      example:
        '<!DOCTYPE html> <html lang="en"> <head>   <meta charset="UTF-8">   <meta name="viewport" content="width=device-width, initial-scale=1.0">   <title>Title</title> </head> <body>   This is a MAIN comment with <strong>bold</strong> and <i>italic</i> text. </body> </html>',
    },
    picture: {
      type: 'string',
      format: 'binary',
      description: 'comment image',
    },
  },
};

export const createAdditionalCommentSchema = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      example:
        '<!DOCTYPE html> <html lang="en"> <head>   <meta charset="UTF-8">   <meta name="viewport" content="width=device-width, initial-scale=1.0">   <title>Title</title> </head> <body>   This is a CHILD comment with <strong>bold</strong> and <i>italic</i> text. </body> </html>',
    },
    parrent_comment_id: { type: 'number', example: '23' },
    picture: {
      type: 'string',
      format: 'binary',
      description: 'comment image',
    },
  },
};
