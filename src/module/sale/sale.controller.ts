/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Patch, Post, ValidationPipe } from '@nestjs/common';
import { RegisterSaleDTO, CancelSaleDTO } from './dtos';
import { SaleInterface } from './interfaces';
import { SaleService } from './sale.service';

@Controller('sale')
export class SaleController {
  constructor(private saleService: SaleService) { }

  @Post()
  async registerSale(
    @Body(ValidationPipe) registerSaleDTO: RegisterSaleDTO,
  ): Promise<SaleInterface | any> {
    try {
      const result = await this.saleService.registerSale(registerSaleDTO);
      return result
    } catch (error) {
      return {
        error: true,
        message: error.message
      }
    }
  }

  @Patch()
  async cancelSale(
    @Body(ValidationPipe) cancelSaleDTO: CancelSaleDTO,
  ): Promise<any> {
    try {
      await this.saleService.cancelSale(cancelSaleDTO);
      return {
        sucess: true
      }
    } catch (error) {
      return {
        error: true,
        message: error.message
      }
    }
  }
}
