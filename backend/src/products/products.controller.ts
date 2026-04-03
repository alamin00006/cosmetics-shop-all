import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { GetProductsDto } from './dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products with filtering and pagination' })
  @ApiResponse({ status: 200, description: 'Returns paginated products list' })
  getProducts(@Query() dto: GetProductsDto) {
    return this.productsService.getProducts(dto);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured products' })
  @ApiResponse({ status: 200, description: 'Returns featured products' })
  getFeaturedProducts() {
    return this.productsService.getFeaturedProducts();
  }

  @Get('new-arrivals')
  @ApiOperation({ summary: 'Get new arrival products' })
  @ApiResponse({ status: 200, description: 'Returns new arrivals' })
  getNewArrivals() {
    return this.productsService.getNewArrivals();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search products' })
  @ApiQuery({ name: 'q', description: 'Search query', required: false })
  @ApiResponse({ status: 200, description: 'Returns matching products' })
  searchProducts(@Query('q') query: string) {
    return this.productsService.searchProducts(query || '');
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Get products by category' })
  @ApiParam({ name: 'category', description: 'Category ID or name' })
  @ApiResponse({ status: 200, description: 'Returns products in category' })
  getProductsByCategory(@Param('category') category: string) {
    return this.productsService.getProductsByCategory(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Returns product details' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  getProduct(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }
}
