import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product')
    private readonly productModule: Model<Product>,
  ) {}

  async getProducts() {
    const product = await this.productModule.find().exec();
    return product.map((prod) => ({
      id: prod._id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async findProductOneById(id: string) {
    try {
      return await this.productModule.findById(id);
    } catch (error) {
      throw new NotFoundException(`not found product id: ${id}`);
    }
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
