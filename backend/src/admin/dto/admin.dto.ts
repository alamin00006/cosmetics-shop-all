import { IsOptional, IsString, IsNumber, IsBoolean, IsArray, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

// Pagination DTOs
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

  @ApiPropertyOptional({ example: 'iPhone', description: 'Search query' })
  @IsOptional()
  @IsString()
  search?: string;
}

export class GetOrdersDto {
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

  @ApiPropertyOptional({ example: 'pending', description: 'Filter by order status' })
  @IsOptional()
  @IsString()
  status?: string;
}

export class GetUsersDto {
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

  @ApiPropertyOptional({ example: 'john', description: 'Search by name or email' })
  @IsOptional()
  @IsString()
  search?: string;
}

// Product DTOs
export class ProductColorDto {
  @ApiProperty({ example: 'Space Black', description: 'Color name' })
  @IsString()
  name: string;

  @ApiProperty({ example: '#1D1D1F', description: 'Color hex code' })
  @IsString()
  hex: string;

  @ApiPropertyOptional({ example: 'https://example.com/black.jpg', description: 'Color-specific image' })
  @IsOptional()
  @IsString()
  image?: string;
}

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15 Pro Max', description: 'Product name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'The most advanced iPhone ever with A17 Pro chip.', description: 'Product description' })
  @IsString()
  description: string;

  @ApiProperty({ example: 1199, description: 'Current price' })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ example: 1299, description: 'Original price (for discount display)' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  originalPrice?: number;

  @ApiProperty({ example: 'https://example.com/iphone.jpg', description: 'Main product image URL' })
  @IsString()
  image: string;

  @ApiPropertyOptional({ type: [String], example: ['https://example.com/img1.jpg'], description: 'Additional images' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({ example: 'cat-smartphones', description: 'Category ID' })
  @IsString()
  categoryId: string;

  @ApiProperty({ example: 'Apple', description: 'Brand name' })
  @IsString()
  brand: string;

  @ApiPropertyOptional({ example: true, description: 'Is product in stock' })
  @IsOptional()
  @IsBoolean()
  inStock?: boolean;

  @ApiPropertyOptional({ type: [String], example: ['A17 Pro chip', '5x optical zoom'], description: 'Product features' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @ApiPropertyOptional({ type: [String], example: ['new', 'bestseller'], description: 'Product tags' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ example: true, description: 'Is new product' })
  @IsOptional()
  @IsBoolean()
  isNew?: boolean;

  @ApiPropertyOptional({ example: false, description: 'Is bestseller' })
  @IsOptional()
  @IsBoolean()
  isBestseller?: boolean;

  @ApiPropertyOptional({ example: { display: '6.7 inch', storage: '256GB' }, description: 'Product specifications' })
  @IsOptional()
  @IsObject()
  specifications?: Record<string, string>;

  @ApiPropertyOptional({ type: [ProductColorDto], description: 'Available colors' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductColorDto)
  colors?: ProductColorDto[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

// Order DTOs
export class UpdateOrderStatusDto {
  @ApiProperty({ example: 'shipped', enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] })
  @IsString()
  status: string;
}

// Category DTOs
export class CreateCategoryDto {
  @ApiProperty({ example: 'Smartphones', description: 'Category name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Smartphone', description: 'Lucide icon name' })
  @IsString()
  icon: string;

  @ApiPropertyOptional({ example: 'https://example.com/category.jpg', description: 'Category image URL' })
  @IsOptional()
  @IsString()
  image?: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

// Analytics DTOs
export class SalesAnalyticsDto {
  @ApiProperty({ example: '2024-01-01', description: 'Start date (YYYY-MM-DD)' })
  @IsString()
  startDate: string;

  @ApiProperty({ example: '2024-01-31', description: 'End date (YYYY-MM-DD)' })
  @IsString()
  endDate: string;

  @ApiPropertyOptional({ example: '2023-12-01', description: 'Comparison period start date' })
  @IsOptional()
  @IsString()
  compareStartDate?: string;

  @ApiPropertyOptional({ example: '2023-12-31', description: 'Comparison period end date' })
  @IsOptional()
  @IsString()
  compareEndDate?: string;

  @ApiPropertyOptional({ example: 'day', enum: ['day', 'week', 'month'], description: 'Group results by time period' })
  @IsOptional()
  @IsString()
  groupBy?: 'day' | 'week' | 'month';
}
