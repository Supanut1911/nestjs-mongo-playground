import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateProductDTO } from './DTO/updateProduct.dto';
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
      const product = await this.productModule.findById(id);
      if (!product) {
        throw new BadRequestException(`not found product id: ${id}`);
      }
      return product;
    } catch (error) {
      throw new NotFoundException(`query findone error:${error}`);
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

  async updateProductById(id: string, updateProductDto: UpdateProductDTO) {
    const { title, desc, price } = updateProductDto;

    try {
      const updatedProduct = await this.findProductOneById(id);
      if (title) updatedProduct.title = title;
      if (desc) updatedProduct.description = desc;
      if (price) updatedProduct.price = price;

      updatedProduct.save();
      return updatedProduct;
    } catch (error) {}
  }
  async deleteProduct(id: string) {
    try {
      const res = await this.productModule
        .deleteOne({
          _id: id,
        })
        .exec();
      if (res.deletedCount === 0) {
        throw new BadRequestException('delete fail');
      }
      return res;
    } catch (error) {
      throw new BadRequestException('delete fail');
    }
  }
}
