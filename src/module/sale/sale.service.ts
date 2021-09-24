/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger } from '@nestjs/common';
import { RegisterSaleDTO } from './dtos/registerSale.dto';
import { SaleInterface } from './interfaces';
import { v4 } from 'uuid';
import { SaleErrorsEnum } from './saleErrors.enum';
import { ProductService } from '../product/product.service';
import { SaleRepository } from './sale.repository';
import { CancelSaleDTO } from './dtos';



@Injectable()
export class SaleService {
    private readonly logger = new Logger(SaleService.name);

    constructor(
        private saleRepository: SaleRepository,
        private productService: ProductService) { }

    async registerSale(registerSaleDTO: RegisterSaleDTO): Promise<SaleInterface> {
        try {
            if (!registerSaleDTO?.soldProductId) throw new Error(SaleErrorsEnum.INVALID_PRODUCT_ID)
            if (!registerSaleDTO?.cpf || !registerSaleDTO?.cpf.trim()) throw new Error(SaleErrorsEnum.INVALID_CPF)
            if (!registerSaleDTO?.saleDate) throw new Error(SaleErrorsEnum.INVALID_DATE)

            const soldProduct = await this.productService.getProductById(registerSaleDTO.soldProductId)

            if (!soldProduct) throw new Error(SaleErrorsEnum.PRODUCT_NOT_FOUND)
            if (soldProduct.estoque < 1) throw new Error(SaleErrorsEnum.PRODUCT_OUT_OF_STOCK)

            const sale: SaleInterface = {
                fiscalNote: {
                    cpf: registerSaleDTO.cpf.trim(),
                    id: v4(),
                    productId: registerSaleDTO.soldProductId,
                    saleDate: registerSaleDTO.saleDate
                },
                productData: {
                    descricao: soldProduct.descricao,
                    nome: soldProduct.nome,
                    tamanho: soldProduct.tamanho,
                    tipo: soldProduct.tipo,
                    id: soldProduct.id
                }
            };
            
            soldProduct.estoque -= 1

            await Promise.all([
                await this.saleRepository.save(sale),
                await this.productService.save(soldProduct)
            ])


            this.logger.log(`Registered sale [${sale.fiscalNote.id}]`)

            return sale
        } catch (error) {
            this.logger.error(error.message)
            throw error
        }
    }

    private validateCancelDTO(cancelSaleDTO: CancelSaleDTO) {
        if (!cancelSaleDTO?.fiscalNoteId)
            throw new Error(SaleErrorsEnum.INVALID_PRODUCT_ID);
        if (!cancelSaleDTO?.cpf || !cancelSaleDTO?.cpf.trim())
            throw new Error(SaleErrorsEnum.INVALID_CPF);
        if (!cancelSaleDTO?.productId)
            throw new Error(SaleErrorsEnum.INVALID_PRODUCT_ID);
    }

    async cancelSale(cancelSaleDTO: CancelSaleDTO): Promise<void> {
        try {
            this.validateCancelDTO(cancelSaleDTO);

            const soldProduct = await this.productService.getProductById(cancelSaleDTO.productId)
            if (!soldProduct) throw new Error(SaleErrorsEnum.PRODUCT_CANCELATION_NOT_FOUND)

            const foundSale: SaleInterface = await this.saleRepository.findOne(cancelSaleDTO)
            if (!foundSale) throw new Error(SaleErrorsEnum.SALE_CANCELATION_NOT_FOUND)

            soldProduct.estoque += 1
            soldProduct.dataAtualizacao = new Date()

            await Promise.all([
                await this.saleRepository.delete(foundSale),
                await this.productService.save(soldProduct)
            ])

            this.logger.log(`Canceled fiscal note: [${cancelSaleDTO.fiscalNoteId}]`)
        } catch (error) {
            this.logger.error(error.message)
            throw error
        }
    }
}
