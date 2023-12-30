import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { InsertProductDTO } from './insertProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async getProducts() {
    return await this.productService.getProducts();
  }

  @Post()
  async insertProduct(@Body() insertProductDto: InsertProductDTO) {
    const { title, desc, price } = insertProductDto;
    return await this.productService.insertProduct(title, desc, price);
  }
}
