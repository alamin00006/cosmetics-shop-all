import { IsOptional, IsNumber, IsString, IsArray } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetProductsDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({ example: 10, description: 'Items per page' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @ApiPropertyOptional({ example: 'cat-smartphones', description: 'Filter by category ID' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 100, description: 'Minimum price' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @ApiPropertyOptional({ example: 1000, description: 'Maximum price' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @ApiPropertyOptional({ type: [String], example: ['Apple', 'Samsung'], description: 'Filter by brands' })
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.split(',') : value))
  @IsArray()
  brands?: string[];

  @ApiPropertyOptional({ example: 'iPhone', description: 'Search query' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 'price-asc', enum: ['price-asc', 'price-desc', 'newest', 'rating'], description: 'Sort order' })
  @IsOptional()
  @IsString()
  sort?: string;
}
