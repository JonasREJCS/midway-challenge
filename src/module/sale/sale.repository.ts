import { Injectable } from "@nestjs/common"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { SaleInterface } from "./interfaces"

@Injectable()
export class SaleRepository {
    constructor(@InjectModel('sale') private saleModel: Model<SaleInterface>) { }

    public async findById(id: number): Promise<SaleInterface> {
        const result: SaleInterface = await this.saleModel.findOne({ id: id })
        return result
    }

    public async save(sale: SaleInterface): Promise<SaleInterface> {
        return await this.saleModel.findOneAndUpdate({ id: sale.fiscalNote.id }, sale, { upsert: true })
    }
}