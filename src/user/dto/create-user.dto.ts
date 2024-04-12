import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty()
  name: string;

  @IsAlphanumeric(null, {
    message: 'Usernamej does not allow other than alpha numeric chars.',
  })
  @MinLength(3, { message: 'User must have at least 3 characters.' })
  @IsNotEmpty()
  username: string;

  @IsEmail(null, { message: 'Please provide valid email.' })
  @IsNotEmpty()
  email: string;

  @IsInt()
  age: number;

  @IsString()
  @IsEnum(['f', 'm', 'u'])
  gender: string;

  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  @IsNotEmpty()
  password: string;
}
