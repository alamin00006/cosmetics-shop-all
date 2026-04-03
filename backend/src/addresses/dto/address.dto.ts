import { IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export enum AddressType {
  HOME = 'home',
  WORK = 'work',
  OTHER = 'other',
}

export class CreateAddressDto {
  @ApiProperty({ example: 'Home', description: 'Address label' })
  @IsString()
  name: string;

  @ApiProperty({ example: '+1 234 567 8900', description: 'Phone number' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '123 Main Street', description: 'Street address' })
  @IsString()
  street: string;

  @ApiProperty({ example: 'San Francisco', description: 'City' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'CA', description: 'State/Province' })
  @IsString()
  state: string;

  @ApiProperty({ example: '94102', description: 'ZIP/Postal code' })
  @IsString()
  zipCode: string;

  @ApiProperty({ example: 'United States', description: 'Country' })
  @IsString()
  country: string;

  @ApiPropertyOptional({ enum: AddressType, example: 'home', description: 'Address type' })
  @IsOptional()
  @IsEnum(AddressType)
  type?: AddressType;

  @ApiPropertyOptional({ example: true, description: 'Set as default address' })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
