import { Injectable } from "@nestjs/common"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { SaleInterface } from "./interfaces"

@Injectable()
export class SaleRepository {
    constructor(@InjectModel('sale') private saleModel: Model<SaleInterface>) { }

    public async save(sale: SaleInterface): Promise<SaleInterface> {
        return await this.saleModel.create(sale)
    }
}