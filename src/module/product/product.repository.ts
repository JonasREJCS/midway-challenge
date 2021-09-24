import { Injectable } from "@nestjs/common"
import { ProductInterface } from "./product.interface"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"

@Injectable()
export class ProductRepository {
    constructor(@InjectModel('product') private productModel: Model<ProductInterface>) { }

    public async findById(id: number): Promise<ProductInterface> {
        const result: ProductInterface = await this.productModel.findOne({ id: id })
        return result
    }

    public async save(product: ProductInterface): Promise<ProductInterface> {
        return await this.productModel.findOneAndUpdate({ id: product.id }, product, { upsert: true })
    }
}