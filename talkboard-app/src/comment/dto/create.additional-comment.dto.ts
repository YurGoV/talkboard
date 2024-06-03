import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { IsValidHtml } from './is-valid-decorator';

export class CreateAdditionalCommentDto {
  @Length(2, 1500, {
    message: 'comment text',
  })
  @IsNotEmpty()
  @IsString()
  @IsValidHtml({ message: 'Invalid HTML content' })
  @ApiProperty({
    example:
      '<!DOCTYPE html> <html lang="en"> <head>   <meta charset="UTF-8">   <meta name="viewport" content="width=device-width, initial-scale=1.0">   <title>Title</title> </head> <body>   <p>This is a child comment with <strong>bold</strong> and <i>italic</i> text.</p> </body> </html>',
    description: 'comment content',
  })
  content: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ example: '24', description: 'parrent comment id' })
  parrent_comment_id: number;
}
