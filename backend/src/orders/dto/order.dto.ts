import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 'addr-demo-1', description: 'Shipping address ID' })
  @IsString()
  addressId: string;

  @ApiPropertyOptional({ example: 'card', enum: ['card', 'paypal', 'cod'], description: 'Payment method' })
  @IsOptional()
  @IsString()
  paymentMethod?: string;
}
