import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @Length(3, 15, {
    message: 'first name length must be from 3 to 15 symbols',
  })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John Doy ', description: 'user name' })
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'email@email.com', description: 'email' })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'https://home.page.com', description: 'home page' })
  homePage: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @ApiProperty({ example: 'iDel8(3j3', description: 'password' })
  password: string;
}
