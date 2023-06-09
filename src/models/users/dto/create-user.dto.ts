import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({
    message: 'Username is missing',
  })
  @IsString({
    message: 'Invalid name is format',
  })
  name?: string;

  @IsNotEmpty({
    message: 'Email is missing',
  })
  @IsEmail(
    {},
    {
      message: 'Email invalid',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'Password is missing',
  })
  @IsString({
    message: 'Invalid password is format',
  })
  password: string;
}
