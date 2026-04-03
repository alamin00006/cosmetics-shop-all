import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddItemDto {
  @ApiProperty({ example: 'prod-iphone-15-pro', description: 'Product ID' })
  @IsString()
  productId: string;

  @ApiPropertyOptional({ example: 'color-black', description: 'Color ID (if applicable)' })
  @IsOptional()
  @IsString()
  colorId?: string;

  @ApiPropertyOptional({ example: 1, minimum: 1, description: 'Quantity to add' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;
}

export class UpdateItemDto {
  @ApiProperty({ example: 2, minimum: 0, description: 'New quantity (0 to remove)' })
  @IsNumber()
  @Min(0)
  quantity: number;
}
