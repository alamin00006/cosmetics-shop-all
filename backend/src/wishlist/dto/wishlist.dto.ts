import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToWishlistDto {
  @ApiProperty({ example: 'prod-iphone-15-pro', description: 'Product ID to add to wishlist' })
  @IsString()
  productId: string;
}
