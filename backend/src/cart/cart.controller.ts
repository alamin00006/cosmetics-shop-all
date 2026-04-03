import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddItemDto, UpdateItemDto } from './dto';
import { CurrentUser, CurrentUserPayload } from '../common';

@ApiTags('Cart')
@Controller('cart')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-auth')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user cart' })
  @ApiResponse({ status: 200, description: 'Returns cart with items and total' })
  getCart(@CurrentUser() user: CurrentUserPayload) {
    return this.cartService.getCart(user.id);
  }

  @Post('items')
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({ status: 201, description: 'Item added to cart' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  addItem(@CurrentUser() user: CurrentUserPayload, @Body() dto: AddItemDto) {
    return this.cartService.addItem(user.id, dto);
  }

  @Patch('items/:itemId')
  @ApiOperation({ summary: 'Update cart item quantity' })
  @ApiParam({ name: 'itemId', description: 'Cart item ID' })
  @ApiResponse({ status: 200, description: 'Item updated' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  updateItem(
    @CurrentUser() user: CurrentUserPayload,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateItemDto,
  ) {
    return this.cartService.updateItem(user.id, itemId, dto);
  }

  @Delete('items/:itemId')
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiParam({ name: 'itemId', description: 'Cart item ID' })
  @ApiResponse({ status: 200, description: 'Item removed' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  removeItem(@CurrentUser() user: CurrentUserPayload, @Param('itemId') itemId: string) {
    return this.cartService.removeItem(user.id, itemId);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Clear all items from cart' })
  @ApiResponse({ status: 204, description: 'Cart cleared' })
  clearCart(@CurrentUser() user: CurrentUserPayload) {
    return this.cartService.clearCart(user.id);
  }
}
