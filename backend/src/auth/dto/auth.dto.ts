import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password (min 6 characters)', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'john@example.com', description: 'Email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  token: string;

  @ApiProperty({
    example: {
      id: 'user-123',
      email: 'john@example.com',
      name: 'John Doe',
    },
  })
  user: {
    id: string;
    email: string;
    name: string;
    phone?: string;
    avatar?: string;
  };
}

export class MessageResponseDto {
  @ApiProperty({ example: 'Operation successful' })
  message: string;
}
