import { Injectable } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product')
    private readonly productModule: Model<Product>,
  ) {}

  async getProducts() {
    const product = await this.productModule.find();
    return product;
  }

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModule({
      title,
      description: desc,
      price,
    });
    const product = await newProduct.save();
    return product;
  }
}
