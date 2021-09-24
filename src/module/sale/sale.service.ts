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



@Injectable()
export class SaleService {
    private readonly logger = new Logger(SaleService.name);

    constructor(
        private saleRepository: SaleRepository,
        private productService: ProductService) { }

    async registerSale(registerSaleDTO: RegisterSaleDTO): Promise<SaleInterface> {
        if (!registerSaleDTO?.soldProductId) throw new Error(SaleErrorsEnum.INVALID_PRODUCT_ID)

        const soldProduct = await this.productService.getProductById(registerSaleDTO.soldProductId)

        if (!soldProduct) throw new Error(SaleErrorsEnum.PRODUCT_NOT_FOUND)

        const sale: SaleInterface = {
            fiscalNote: {
                cpf: registerSaleDTO.cpf,
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

        await this.saleRepository.save(sale)

        this.logger.log(`Registered sale [${sale.fiscalNote.id}]`)

        return sale

    }

}
