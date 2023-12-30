import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { InsertProductDTO } from './DTO/insertProduct.dto';
import { UpdateProductDTO } from './DTO/updateProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async getProducts() {
    return await this.productService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.findProductOneById(id);
  }

  @Patch(':id')
  async updateProductById(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDTO,
  ) {
    return await this.productService.updateProductById(id, updateProductDto);
  }

  @Post()
  async insertProduct(@Body() insertProductDto: InsertProductDTO) {
    const { title, desc, price } = insertProductDto;
    return await this.productService.insertProduct(title, desc, price);
  }
}
