import { Controller, Get, Post, Delete, Body, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { WishlistService } from './wishlist.service';
import { AddToWishlistDto } from './dto';
import { CurrentUser, CurrentUserPayload } from '../common';

@ApiTags('Wishlist')
@Controller('wishlist')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-auth')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Get()
  @ApiOperation({ summary: 'Get user wishlist' })
  @ApiResponse({ status: 200, description: 'Returns wishlist items' })
  getWishlist(@CurrentUser() user: CurrentUserPayload) {
    return this.wishlistService.getWishlist(user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Add product to wishlist' })
  @ApiResponse({ status: 201, description: 'Product added to wishlist' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 409, description: 'Product already in wishlist' })
  addToWishlist(@CurrentUser() user: CurrentUserPayload, @Body() dto: AddToWishlistDto) {
    return this.wishlistService.addToWishlist(user.id, dto.productId);
  }

  @Delete(':productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove product from wishlist' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiResponse({ status: 204, description: 'Product removed from wishlist' })
  @ApiResponse({ status: 404, description: 'Item not in wishlist' })
  removeFromWishlist(@CurrentUser() user: CurrentUserPayload, @Param('productId') productId: string) {
    return this.wishlistService.removeFromWishlist(user.id, productId);
  }
}
