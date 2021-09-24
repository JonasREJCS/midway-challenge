import { Injectable } from "@nestjs/common"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { SaleInterface } from "./interfaces"
import { CancelSaleDTO } from "./dtos"

@Injectable()
export class SaleRepository {
    constructor(@InjectModel('sale') private saleModel: Model<SaleInterface>) { }

    public async save(sale: SaleInterface): Promise<SaleInterface> {
        return await this.saleModel.create(sale)
    }

    public async delete(sale: SaleInterface): Promise<void> {
        await this.saleModel.findByIdAndDelete(sale._id)
    }

    public async findOne(cancelSaleDTO: CancelSaleDTO): Promise<SaleInterface> {
        return await this.saleModel.findOne(
            {  "fiscalNote.id": cancelSaleDTO.fiscalNoteId },
            {  "fiscalNote.cpf": cancelSaleDTO.cpf },
            {  "fiscalNote.productId": cancelSaleDTO.productId },
        )
    }
}